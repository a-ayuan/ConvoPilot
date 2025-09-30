import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import '../styles/TopBar.css';

export default function TopBar() {
  const user = useAuthStore(state => state.user);
  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src={logo} className="logo-icon" alt="ConvoPilot Logo" />
        <h1 className="logo-text">ConvoPilot</h1>
      </div>
      <div className="topbar-right">
        <ThemeToggle />
      </div>
    </header>
  );
}
