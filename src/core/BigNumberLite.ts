export type BigNumberInput = BigNumberLite | string | number;

const ZERO = { mantissa: 0, exponent: 0 };

function assertFinite(value: number, label: string) {
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid BigNumberLite ${label}`);
  }
}

export class BigNumberLite {
  readonly mantissa: number;
  readonly exponent: number;

  constructor(mantissa: number, exponent = 0) {
    assertFinite(mantissa, "mantissa");
    assertFinite(exponent, "exponent");
    const normalized = BigNumberLite.normalize(mantissa, Math.trunc(exponent));
    this.mantissa = normalized.mantissa;
    this.exponent = normalized.exponent;
  }

  static zero() {
    return new BigNumberLite(0, 0);
  }

  static one() {
    return new BigNumberLite(1, 0);
  }

  static from(input: BigNumberInput): BigNumberLite {
    if (input instanceof BigNumberLite) {
      return input;
    }
    if (typeof input === "number") {
      if (input === 0) return BigNumberLite.zero();
      assertFinite(input, "number");
      return BigNumberLite.fromString(String(input));
    }
    return BigNumberLite.fromString(input);
  }

  static fromString(raw: string): BigNumberLite {
    const value = String(raw ?? "").trim();
    if (!value) return BigNumberLite.zero();
    const numeric = Number(value);
    if (Number.isFinite(numeric) && Math.abs(numeric) < 1e308) {
      if (numeric === 0) return BigNumberLite.zero();
      const exponent = Math.floor(Math.log10(Math.abs(numeric)));
      return new BigNumberLite(numeric / 10 ** exponent, exponent);
    }

    const match = value.match(/^([+-]?\d+(?:\.\d+)?)(?:e([+-]?\d+))?$/i);
    if (!match) {
      throw new Error(`Cannot parse BigNumberLite: ${raw}`);
    }
    const coefficient = match[1];
    const explicitExponent = Number(match[2] ?? 0);
    const sign = coefficient.startsWith("-") ? -1 : 1;
    const unsigned = coefficient.replace(/^[+-]/, "");
    const [integerPart, decimalPart = ""] = unsigned.split(".");
    const integerDigits = integerPart.replace(/^0+/, "");
    const firstDecimalNonZero = decimalPart.search(/[1-9]/);
    const digits = integerDigits
      ? `${integerDigits}${decimalPart}`
      : (firstDecimalNonZero >= 0 ? decimalPart.slice(firstDecimalNonZero) : "");
    if (!digits) return BigNumberLite.zero();
    const mantissaDigits = digits.slice(0, 16);
    const mantissa = sign * Number(`${mantissaDigits[0]}.${mantissaDigits.slice(1) || "0"}`);
    const exponent = (integerDigits
      ? integerDigits.length - 1
      : -(firstDecimalNonZero + 1)) + explicitExponent;
    return new BigNumberLite(mantissa, exponent);
  }

  private static normalize(mantissa: number, exponent: number) {
    if (mantissa === 0) return ZERO;
    const sign = mantissa < 0 ? -1 : 1;
    let nextMantissa = Math.abs(mantissa);
    let nextExponent = exponent;
    if (nextMantissa >= 10 || nextMantissa < 1) {
      const shift = Math.floor(Math.log10(nextMantissa));
      nextMantissa /= 10 ** shift;
      nextExponent += shift;
    }
    if (nextMantissa >= 10) {
      nextMantissa /= 10;
      nextExponent += 1;
    }
    if (nextMantissa < 1) {
      nextMantissa *= 10;
      nextExponent -= 1;
    }
    return {
      mantissa: sign * nextMantissa,
      exponent: Math.trunc(nextExponent),
    };
  }

  isZero() {
    return this.mantissa === 0;
  }

  add(input: BigNumberInput): BigNumberLite {
    const other = BigNumberLite.from(input);
    if (this.isZero()) return other;
    if (other.isZero()) return this;
    const diff = this.exponent - other.exponent;
    if (diff > 18) return this;
    if (diff < -18) return other;
    if (diff >= 0) {
      return new BigNumberLite(this.mantissa + other.mantissa / 10 ** diff, this.exponent);
    }
    return new BigNumberLite(this.mantissa / 10 ** -diff + other.mantissa, other.exponent);
  }

  subtract(input: BigNumberInput): BigNumberLite {
    const other = BigNumberLite.from(input);
    return this.add(new BigNumberLite(-other.mantissa, other.exponent));
  }

  multiply(input: BigNumberInput): BigNumberLite {
    const other = BigNumberLite.from(input);
    if (this.isZero() || other.isZero()) return BigNumberLite.zero();
    return new BigNumberLite(this.mantissa * other.mantissa, this.exponent + other.exponent);
  }

  divide(input: BigNumberInput): BigNumberLite {
    const other = BigNumberLite.from(input);
    if (other.isZero()) throw new Error("Cannot divide BigNumberLite by zero");
    if (this.isZero()) return BigNumberLite.zero();
    return new BigNumberLite(this.mantissa / other.mantissa, this.exponent - other.exponent);
  }

  pow(power: number): BigNumberLite {
    assertFinite(power, "power");
    if (this.isZero()) return BigNumberLite.zero();
    const log10 = (Math.log10(Math.abs(this.mantissa)) + this.exponent) * power;
    const exponent = Math.floor(log10);
    const mantissa = 10 ** (log10 - exponent);
    return new BigNumberLite(this.mantissa < 0 && power % 2 !== 0 ? -mantissa : mantissa, exponent);
  }

  floor(): BigNumberLite {
    if (this.exponent < 0) return BigNumberLite.zero();
    if (this.exponent > 15) return this;
    return BigNumberLite.from(Math.floor(this.toNumberSafe()));
  }

  compare(input: BigNumberInput): number {
    const other = BigNumberLite.from(input);
    if (this.mantissa === other.mantissa && this.exponent === other.exponent) return 0;
    if (this.mantissa < 0 && other.mantissa >= 0) return -1;
    if (this.mantissa >= 0 && other.mantissa < 0) return 1;
    const sign = this.mantissa < 0 ? -1 : 1;
    if (this.exponent !== other.exponent) {
      return this.exponent > other.exponent ? sign : -sign;
    }
    return this.mantissa > other.mantissa ? 1 : -1;
  }

  gte(input: BigNumberInput) {
    return this.compare(input) >= 0;
  }

  lt(input: BigNumberInput) {
    return this.compare(input) < 0;
  }

  max(input: BigNumberInput) {
    return this.gte(input) ? this : BigNumberLite.from(input);
  }

  toNumberSafe() {
    if (this.isZero()) return 0;
    if (this.exponent > 308) return Number.MAX_VALUE;
    if (this.exponent < -324) return 0;
    const value = this.mantissa * 10 ** this.exponent;
    return Number.isFinite(value) ? value : Number.MAX_VALUE;
  }

  toString() {
    if (this.isZero()) return "0";
    if (this.exponent >= 21 || this.exponent <= -7) {
      return `${Number(this.mantissa.toPrecision(12))}e${this.exponent}`;
    }
    return String(this.toNumberSafe());
  }

  format(style: "short" | "scientific" = "short") {
    if (this.isZero()) return "0";
    if (style === "scientific" || this.exponent >= 33) {
      return `${this.mantissa.toFixed(2)}e${this.exponent}`;
    }
    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    const tier = Math.floor(this.exponent / 3);
    if (tier <= 0) {
      return Math.floor(this.toNumberSafe()).toLocaleString("en-US");
    }
    const suffix = suffixes[tier];
    if (!suffix) {
      return `${this.mantissa.toFixed(2)}e${this.exponent}`;
    }
    const scaled = this.mantissa * 10 ** (this.exponent - tier * 3);
    const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
    return `${Number(scaled.toFixed(digits))}${suffix}`;
  }
}
