export default function PageHeader({ title, description, children }) {
  return (
    <header className="page-header">
      <div className="page-header__main">
        <h1>{title}</h1>
        {description && <p className="page-header__description">{description}</p>}
      </div>
      {children && <div className="page-header__actions">{children}</div>}
    </header>
  );
}
