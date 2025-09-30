import React from 'react';
import '../styles/BackgroundFX.css';

export default function BackgroundFX() {
  return (
    <div className="bgfx" aria-hidden>
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="blob b4" />
      <div className="blob b5" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />
    </div>
  );
}



