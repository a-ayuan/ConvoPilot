import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DraftInput from './pages/DraftInput';
import HistoryLog from './pages/HistoryLog';
import Info from './pages/Info';


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/info" replace />} />
        <Route path="/draft" element={<DraftInput />} />
        <Route path="/history" element={<HistoryLog />} />
        <Route path="/info" element={<Info/>} />
      </Routes>
    </Layout>
  );
}
