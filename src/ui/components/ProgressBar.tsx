type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className="progress-block">
      {label ? <div className="progress-label">{label}</div> : null}
      <div className="progress-track" aria-label={label} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(clamped * 100)}>
        <span style={{ width: `${clamped * 100}%` }} />
      </div>
    </div>
  );
}
