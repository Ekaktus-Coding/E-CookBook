export default function StatusMessage({ variant = 'info', title, children, action }) {
  return (
    <div className={`status status-${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      {title && <p className="status__title">{title}</p>}
      {children && <p className="status__text">{children}</p>}
      {action}
    </div>
  );
}
