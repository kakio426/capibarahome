import { describe, expect, it } from "vitest";
import { BigNumberLite } from "../core/BigNumberLite";
import { formatNumber } from "../core/formatNumber";
import { calculateEps, calculateTapGain, upgradeCost } from "../core/gameMath";

describe("balance math and BigNumberLite", () => {
  it("calculates upgrade cost growth from config values", () => {
    expect(upgradeCost("100", 1.2, 0).toString()).toBe("100");
    expect(upgradeCost("100", 1.2, 2).toNumberSafe()).toBe(144);
  });

  it("calculates tap gain with upgrades, prestige, and ad multiplier", () => {
    const gain = calculateTapGain({
      upgrades: { soft_paw: 2 },
      goldenLeaf: "10",
      adBoostUntil: 2_000,
      nowMs: 1_000,
    });
    expect(gain.toNumberSafe()).toBe(9);
  });

  it("calculates EPS with generators and toolbox multiplier", () => {
    const eps = calculateEps({
      generators: { orange_basket: 5, butler_toolbox: 1 },
      goldenLeaf: "0",
      adBoostUntil: null,
      nowMs: 1_000,
    });
    expect(eps.toNumberSafe()).toBeCloseTo(105841.08, 5);
  });

  it("supports large number add, multiply, compare, and decimal parsing", () => {
    const huge = BigNumberLite.from("9.99e45");
    const multiplied = huge.multiply(10);
    expect(multiplied.gte("9.99e46")).toBe(true);
    expect(multiplied.add("1e20").compare(multiplied)).toBe(0);
    expect(BigNumberLite.from("0.001").toString()).toBe("0.001");
  });

  it("formats short and scientific numbers", () => {
    expect(formatNumber(BigNumberLite.from(999))).toBe("999");
    expect(formatNumber(BigNumberLite.from(1230))).toBe("1.23K");
    expect(formatNumber(BigNumberLite.from("7.89e45"), "scientific")).toBe("7.89e45");
  });
});
