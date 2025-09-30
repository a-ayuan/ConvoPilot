import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import '../styles/TopBar.css';
import { useUiStore } from '../store/uiStore';

export default function TopBar() {
  const user = useAuthStore(state => state.user);
  const toggleSidebar = useUiStore(s => s.toggleSidebar);
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle" aria-label="Toggle sidebar" onClick={toggleSidebar}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <Logo size={56} />
        <h1 className="logo-text">ConvoPilot</h1>
      </div>
      <div className="topbar-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
