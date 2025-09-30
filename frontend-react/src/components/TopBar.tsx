import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import '../styles/TopBar.css';

const links = [
  { to: '/draft', label: 'Draft Input' },
  { to: '/history', label: 'History Log' },
  { to: '/info', label: 'Info' },
];

export default function TopBar() {
  const user = useAuthStore(state => state.user);
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        {/* Mobile menu toggle */}
        <button
          className={`menu-toggle ${open ? 'open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <Logo size={48} />
        <h1 className="logo-text">ConvoPilot</h1>

        {/* Desktop nav */}
        <nav className="nav" aria-label="Primary">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="nav-pill">{l.label}</span>
              <span className="nav-underline" />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="topbar-right">
        <ThemeToggle />
      </div>

      {/* Mobile dropdown */}
      <nav
        className={`nav-mobile ${open ? 'show' : ''}`}
        aria-label="Mobile"
        onClick={() => setOpen(false)}
      >
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className="nav-mobile-link">
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
