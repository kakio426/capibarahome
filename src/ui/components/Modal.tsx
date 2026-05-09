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
    <div className="modal-backdrop ui-modal-backdrop" role="presentation">
      <section className={`modal ui-modal ${className}`.trim()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header ui-modal__header">
          <h2 id="modal-title" data-ui-critical="modal-title">{title}</h2>
          {onClose ? (
            <button className="icon-button ui-icon-button" type="button" aria-label="닫기" onClick={onClose}>
              ×
            </button>
          ) : null}
        </header>
        <div className={`modal-body ui-modal__body ${bodyClassName}`.trim()}>{children}</div>
        <footer className="modal-actions ui-modal__actions" data-ui-critical="modal-actions">
          {actions ?? (onClose ? <Button onClick={onClose}>확인</Button> : null)}
        </footer>
      </section>
    </div>
  );
}
