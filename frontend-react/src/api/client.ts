import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080' });

export async function evaluateDraft(message: string, goal: string) {
  const res = await api.post('/simulate', { message, goal });
  return res.data; // { bestMessage, score, stats }
}

export async function fetchHistory() {
  const res = await api.get('/history/demo'); // use real user id
  return res.data;
}

export default api;
