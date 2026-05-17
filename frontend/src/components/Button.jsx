import { Link } from 'react-router-dom';

export default function Button({
  to,
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
