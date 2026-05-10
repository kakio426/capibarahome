import { ProgressMeter } from "../primitives/ProgressMeter";

type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  return <ProgressMeter value={value} label={label} />;
}
