export default function FormField({ label, id, hint, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="field__hint">{hint}</p>}
      {children}
    </div>
  );
}
