import { ReactNode } from 'react';
import TopBar from './TopBar';
import BackgroundFX from './BackgroundFX';
import '../styles/Layout.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-grid">
      <BackgroundFX />
      <div className="main-area">
        <TopBar />
        <div className="view-area">{children}</div>
      </div>
    </div>
  );
}
