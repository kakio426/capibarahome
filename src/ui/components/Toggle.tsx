type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className={`toggle-row ui-ledger-row ui-toggle ${checked ? "is-on" : "is-off"}`}>
      <span className="toggle-label ui-toggle__label">{label}</span>
      <span className="toggle-switch ui-toggle__switch" aria-hidden="true">
        <span className="toggle-thumb ui-toggle__thumb" />
      </span>
      <input
        className="toggle-input ui-toggle__input"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
    </label>
  );
}
