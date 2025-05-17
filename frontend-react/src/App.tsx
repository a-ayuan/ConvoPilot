import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DraftInput from './pages/DraftInput';
import GoalPanel from './pages/GoalPanel';
import Dashboard from './pages/Dashboard';
import HistoryLog from './pages/HistoryLog';
import Login from './pages/Login';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/draft" replace />} />
        <Route path="/draft" element={<DraftInput />} />
        <Route path="/goal" element={<GoalPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<HistoryLog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}
