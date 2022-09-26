import { useState, useEffect } from 'react';
import { ThemeType, lightTheme, darkTheme } from '../styles/theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<ThemeType>(lightTheme);

  const setMode = (mode: ThemeType) => {
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === lightTheme) {
      window.localStorage.setItem('theme', 'dark');
      setMode(darkTheme);
    } else {
      window.localStorage.setItem('theme', 'light');
      setMode(lightTheme);
    }
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    !localTheme
      ? setMode(darkTheme)
      : localTheme === 'dark'
      ? setMode(darkTheme)
      : setMode(lightTheme);
  });

  return { theme, toggleTheme };
};
