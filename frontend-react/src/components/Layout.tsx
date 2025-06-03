import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import '../styles/Layout.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-grid">
      <Sidebar />
      <div className="main-area">
        <TopBar />
        <div className="view-area">{children}</div>
      </div>
    </div>
  );
}
