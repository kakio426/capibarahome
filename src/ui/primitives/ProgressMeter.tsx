type ProgressMeterProps = {
  value: number;
  label?: string;
  className?: string;
};

export function ProgressMeter({ value, label, className = "" }: ProgressMeterProps) {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className={`progress-block ui-progress progress-meter ${className}`.trim()}>
      {label ? <div className="progress-label ui-progress__label">{label}</div> : null}
      <div
        className="progress-track ui-progress-groove progress-meter__track"
        aria-label={label}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped * 100)}
      >
        <span className="ui-progress__fill progress-meter__fill" style={{ width: `${clamped * 100}%` }} />
      </div>
    </div>
  );
}
