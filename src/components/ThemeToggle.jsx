import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1002,
        background: theme === 'dark' ? '#f59e0b' : '#6366f1',
        color: 'white',
        border: '3px solid var(--border-color)',
        borderRadius: 'var(--radius)',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '0.9rem',
        boxShadow: 'var(--shadow-hard)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: "'Fredoka', 'Inter', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translate(-2px, -2px)';
        e.target.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translate(0, 0)';
        e.target.style.boxShadow = 'var(--shadow-hard)';
      }}
      onMouseDown={(e) => {
        e.target.style.transform = 'translate(2px, 2px)';
        e.target.style.boxShadow = 'none';
      }}
      onMouseUp={(e) => {
        e.target.style.transform = 'translate(0, 0)';
        e.target.style.boxShadow = 'var(--shadow-hard)';
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span>
        {theme === 'light' ? 'Sombre' : 'Clair'}
      </span>
    </button>
  );
};

export default ThemeToggle;
