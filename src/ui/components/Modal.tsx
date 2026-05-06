import { PropsWithChildren, ReactNode } from "react";
import { Button } from "./Button";

type ModalProps = PropsWithChildren<{
  title: string;
  open: boolean;
  onClose?: () => void;
  actions?: ReactNode;
  className?: string;
  bodyClassName?: string;
}>;

export function Modal({ title, open, onClose, actions, children, className = "", bodyClassName = "" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation">
      <section className={`modal ${className}`.trim()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          {onClose ? (
            <button className="icon-button" type="button" aria-label="닫기" onClick={onClose}>
              ×
            </button>
          ) : null}
        </header>
        <div className={`modal-body ${bodyClassName}`.trim()}>{children}</div>
        <footer className="modal-actions">
          {actions ?? (onClose ? <Button onClick={onClose}>확인</Button> : null)}
        </footer>
      </section>
    </div>
  );
}
