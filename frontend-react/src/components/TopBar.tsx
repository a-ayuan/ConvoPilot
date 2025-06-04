import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo.png';
import '../styles/TopBar.css';

export default function TopBar() {
  const user = useAuthStore(state => state.user);
  return (
    <header className="topbar">
      <img src={logo} className="logo-icon" />
      <h1 className='logo-text'>ConvoPilot</h1>
    </header>
  );
}
