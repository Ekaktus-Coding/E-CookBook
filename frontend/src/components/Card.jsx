export default function Card({ as: Tag = 'section', title, className = '', children }) {
  return (
    <Tag className={['panel', className].filter(Boolean).join(' ')}>
      {title && <h2 className="panel__title">{title}</h2>}
      {children}
    </Tag>
  );
}
