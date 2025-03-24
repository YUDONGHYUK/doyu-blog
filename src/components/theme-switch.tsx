'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Icon from './icons/icon';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button>
        <Icon kind="sun" size={24} className="fill-[#1f2028]" />
      </button>
    );
  }

  if (resolvedTheme === 'dark') {
    return (
      <button onClick={() => setTheme('light')} className="fill-text">
        <Icon kind="moon" size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme('dark')}
      className="fill-text transition-all duration-300 ease-linear"
    >
      <Icon kind="sun" size={24} />
    </button>
  );
}
