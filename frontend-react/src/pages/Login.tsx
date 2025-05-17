import { useAuthStore } from '../store/authStore';

export default function Login() {
  const login = useAuthStore(s => s.login);

  return (
    <>
      <h2>Login (placeholder)</h2>
      <button onClick={() => login({ email: 'demo@demo.com' })}>Log in as demo</button>
    </>
  );
}
