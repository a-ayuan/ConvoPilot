import { NavLink } from 'react-router-dom';
import { useUiStore } from '../store/uiStore';
import '../styles/Sidebar.css'; //create simple CSS or Tailwind

const links = [
  { to: '/draft', label: '📝 Draft Input' },
  { to: '/history', label: '📚 History Log' },
  { to: '/info', label: 'ⓘ Info' },
];

export default function Sidebar() {
  const sidebarOpen = useUiStore(s => s.sidebarOpen);
  return (
    <aside className={sidebarOpen ? 'sidebar' : 'sidebar collapsed'}>
      {links.map((l, index) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) => (isActive ? 'active link' : 'link')}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
