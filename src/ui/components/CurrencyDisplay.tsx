import { BigNumberLite } from "../../core/BigNumberLite";
import { NumberFormatMode } from "../../game/GameTypes";

type CurrencyDisplayProps = {
  label: string;
  value: BigNumberLite;
  emoji: string;
  format: NumberFormatMode;
};

export function CurrencyDisplay({ label, value, emoji, format }: CurrencyDisplayProps) {
  return (
    <div className="currency-display">
      <span className="currency-emoji" aria-hidden="true">{emoji}</span>
      <div>
        <span className="currency-label">{label}</span>
        <strong>{value.format(format)}</strong>
      </div>
    </div>
  );
}
