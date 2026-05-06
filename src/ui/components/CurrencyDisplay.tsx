import { BigNumberLite } from "../../core/BigNumberLite";
import { NumberFormatMode } from "../../game/GameTypes";
import { VisualAssetIcon } from "./VisualAssetIcon";

type CurrencyDisplayProps = {
  label: string;
  value: BigNumberLite;
  assetKey: string;
  format: NumberFormatMode;
};

export function CurrencyDisplay({ label, value, assetKey, format }: CurrencyDisplayProps) {
  return (
    <div className="currency-display ui-plaque ui-plaque--currency">
      <span className="currency-icon ui-plaque__icon" aria-hidden="true">
        <VisualAssetIcon assetKey={assetKey} />
      </span>
      <div>
        <span className="currency-label ui-plaque__label">{label}</span>
        <strong>{value.format(format)}</strong>
      </div>
    </div>
  );
}
