import React from 'react';

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 48 }: LogoProps) {
  const dimension = `${size}`;
  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ConvoPilot Logo"
      role="img"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--blue-500)" />
          <stop offset="100%" stopColor="var(--blue-700)" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#softGlow)">
        <rect x="6" y="6" width="52" height="52" rx="14" fill="var(--bg-glass)" stroke="var(--border-glass)" />
        <path d="M20 24c0-2.209 1.791-4 4-4h8c8.837 0 16 7.163 16 16v2c0 2.209-1.791 4-4 4H36l-6 6-2-6h-4c-2.209 0-4-1.791-4-4V24z" fill="url(#logoGradient)" />
        <circle cx="28" cy="28" r="3" fill="var(--text-inverse)" />
      </g>
    </svg>
  );
}


