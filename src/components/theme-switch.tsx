'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import Icon from './icons/icon';

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <button onClick={toggleTheme}>
      <Icon
        kind="sun"
        size={24}
        className="hidden [html.dark_&]:block fill-text"
      />
      <Icon
        kind="moon"
        size={24}
        className="hidden [html.light_&]:block fill-text"
      />
    </button>
  );
}
