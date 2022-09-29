---
title: '다크모드 구현(Next.js + Typescript + Styled-components)'
date: '2022-09-28'
image: 'dummy-posts.png'
excerpt: 'Next.js + Typescript + Styled-components를 통해 다크모드를 구현'
isFeatured: true
---

이 글에서는 블로그를 개발하면서 다크모드를 적용한 방법에 대해 정리하려고 합니다. Next.js, Typescript, Styled-components를 사용하여 블로그를 구현하려는 사람들에게 조금이나마 도움이 되었으면 좋겠습니다.

## theme 설정

라이트모드와 다크모드일 때 사용할 스타일을 지정합니다.

```typescript
// styles/theme.ts

export type ThemeType = typeof lightTheme;

export const lightTheme = {
  borderColor: '#566573',
  bgColor: {
    primary: '#f8f7f4',
    secondary: '#ffffff',
  },
  text: {
    primary: '#252525',
    secondary: '#374151',
    tertiary: '#566573',
  },
};

export const darkTheme = {
  borderColor: '#9ca3af',
  bgColor: {
    primary: '#1e1e1e',
    secondary: '#232323',
  },
  text: {
    primary: '#f0f0f0',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
  },
};
```

## global style 설정

```typescript
// styles/global-style.ts

import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.125rem;
    font-weight: 300;
    background-color: ${({ theme }) => theme.bg_page};
    color: ${({ theme }) => theme.text2}
  }
`;

  // 다른 HTML element에 대해서도 자주 사용하는 스타일링을 적용해 주면 됩니다.
```
타입스트립트와 styled-components를 사용하고, `GlobalStyle`에 `ThemeProvider`로 전달해준 `theme`을 사용하는 경우에는 theme으로 전달된 객체의 프로퍼티 타입들을 명시해줘야 한다.

## 다크모드 관리를 위한 custom hook

```ts
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
```
- 우선, 테마에 맞는 스타일을 저장하기 위해 useState 훅을 사용하여 저장하였다.