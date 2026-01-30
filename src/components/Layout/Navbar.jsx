import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.location.reload()}>
        <img src={theme === 'dark' ? "/weblogo-light.png" : "/weblogo-dark.png"} alt="Quick-3D Logo" className="h-12 w-auto object-contain" />
      </div>
      
      <div className="pointer-events-auto flex gap-6 items-center">
        <button 
          onClick={toggleTheme} 
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors text-xl"
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <a 
          href="https://github.com/Dheeraj-Chintala" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-xl"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
