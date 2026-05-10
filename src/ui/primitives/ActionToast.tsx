type ActionToastProps = {
  message: string;
};

export function ActionToast({ message }: ActionToastProps) {
  return <div className="toast ui-toast-banner action-toast" role="status">{message}</div>;
}
