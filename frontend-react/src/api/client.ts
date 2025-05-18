import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080' });

export async function evaluateDraft(message: string, goal: string) {
  const res = await api.post('/simulate', {
    user_context: '', // fill from UI
    message_type: '', // fill from UI
    past_messages: '', // fill from UI
    goal,
    user_input: message
  });
  return res.data;
}

export async function fetchHistory() {
  const res = await api.get('/history/demo'); // use real user id
  return res.data;
}

export async function optimizeMessage(content: string) {
  const res = await api.post('/api/messages/optimize', { content });
  return res.data; // { id, content, score, visits }
}

export default api;
