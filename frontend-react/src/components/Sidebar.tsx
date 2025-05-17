import { NavLink } from 'react-router-dom';
import './Sidebar.css'; //create simple CSS or Tailwind

const links = [
  { to: '/draft', label: '📝 Draft Input' },
  { to: '/goal', label: '🎯 Goal Panel' },
  { to: '/dashboard', label: '📊 Dashboard' },
  { to: '/history', label: '📚 History Log' },
  { to: '/login', label: '🔐 Login' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {links.map(l => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) => (isActive ? 'active link' : 'link')}
        >
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
