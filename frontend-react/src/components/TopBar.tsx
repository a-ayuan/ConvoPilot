import { useAuthStore } from '../store/authStore';

export default function TopBar() {
  const user = useAuthStore(state => state.user);
  return (
    <header className="topbar">
      <h1>ConvoPilot</h1>
      {user && <span>Welcome, {user.email}</span>}
    </header>
  );
}
