import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  const setMode = (mode: Theme) => {
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setMode('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !localTheme
      ? setMode('dark')
      : localTheme === 'dark'
      ? setMode('dark')
      : setMode('light');
  });

  return { theme, toggleTheme };
};
