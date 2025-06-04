import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'; //create simple CSS or Tailwind

const links = [
  { to: '/draft', label: '📝 Draft Input' },
  { to: '/history', label: '📚 History Log' },
  { to: '/info', label: 'ⓘ Info' },
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
