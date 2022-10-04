import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  const setMode = (mode: Theme) => {
    if (mode === 'light') {
      document.body.dataset.theme = 'light';
      window.localStorage.setItem('theme', 'light');
      setTheme(mode);
    } else {
      document.body.dataset.theme = 'dark';
      window.localStorage.setItem('theme', 'dark');
      setTheme(mode);
    }
  };

  const toggleTheme = () => {
    if (!theme) return;
    theme && theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;

    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !localTheme
      ? setMode('dark')
      : localTheme
      ? setMode(localTheme)
      : setMode('light');
  }, []);

  return { theme, toggleTheme };
};
