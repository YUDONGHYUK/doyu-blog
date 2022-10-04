---
title: '블로그에 다크 모드 적용하기(Next.js + Typescript + Styled-components)'
date: '2022-09-28'
image: 'thumbnail.png'
excerpt: 'Next.js + Typescript + Styled-components를 통해 다크모드를 구현'
isFeatured: true
---

이 글에서는 블로그를 개발하면서 다크모드를 적용한 방법에 대해 정리하려고 합니다. Next.js, Typescript, Styled-components를 사용하여 블로그를 구현하려는 사람들에게 조금이나마 도움이 되었으면 좋겠습니다.

## theme 설정

라이트모드와 다크모드일 때 사용할 스타일을 지정합니다.

```typescript
// styles/theme.ts

type ThemeVariables = {
  bg_page: string;
  bg_element: string;
  text1: string;
  text2: string;
  text3: string;
  border: string;
  blue1: string;
  blue2: string;
};
type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    bg_page: '#f8f7f4',
    bg_element: '#ffffff',
    text1: '#252525',
    text2: '#374151',
    text3: '#566573',
    border: '#566573',
    blue1: '#2e86c1',
    blue2: '#5dade2',
  },
  dark: {
    bg_page: '#1e1e1e',
    bg_element: '#232323',
    text1: '#f0f0f0',
    text2: '#d1d5db',
    text3: '#9ca3af',
    border: '#9ca3af',
    blue1: '#5dade2',
    blue2: '#2e86c1',
  },
};
```

## global style 설정
처음 방문한 사용자에게 시스템 테마로 UI를 보여주기 위해서 styled-components와 [CSS Variable](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)을 사용하여 다크모드를 구현하였습니다.

```typescript
// styles/global-style.ts

import { createGlobalStyle } from 'styled-components';
import { themes } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    ${themes.light}
  }

  @media (prefers-color-scheme: dark) {
    body {
      ${themes.dark}
    }
  }

  body[data-theme='light'] {
    ${themes.light};
  }

  body[data-theme='dark'] {
    ${themes.dark};
  }
`;

  // 다른 HTML element에 대해서도 자주 사용하는 스타일링을 적용해 주면 됩니다.
```
사용자의 시스템이 어떤 테마를 사용하는지 알아내기 위해 [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS 미디어 쿼리를 사용했습니다. 하지만 시스템 선호 테마가 없을 수도 있기 때문에 CSS Variable의 기본값을 light 모드로 하고 dark 모드를 위한 미디어 쿼리를 작성했습니다. 사용자 테마를 정하기 위해서는 [데이터 속성](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)을 사용하여 body 속성을 변경해줍니다.

(GlobalStyle에서 사용한 themes에 대해서는 아래에서 확인할 수 있습니다.)

## themeVariableSets를 CSS Variable 스타일 코드로 변경하기
위에서 정의한 themeVariableSets는 CSS Variable 코드 스타일에 맞지 않기 때문에 CSS Variable 코드 스타일에 맞게 변경해줘야 합니다.

```typescript
// styles/theme.ts

// 이전 코드 생략...

const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as VariableKey[];
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    ''
  );
};

export const themes = {
  light: buildCssVariables(themeVariableSets.light),
  dark: buildCssVariables(themeVariableSets.dark),
};
```


## 다크모드 관리를 위한 custom hook
테마와 테마 토글 함수 반환하는 useDarkMode라는 훅을 만들었습니다.

```typescript
// lib/useDarkMode.ts

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
```
- 우선, useState 훅을 사용하여 사용자가 설정한 테마를 저장합니다. 사용자 설정 테마의 초기값은 null이고 이 값이 정해지지 않았을 경우에는 시스템 테마를 사용합니다.
- toggleTheme 함수를 만들어서 토글 버튼이 클릭될 때마다 테마를 변경해줍니다.
- 사용자가 지정한 테마는 localStorage를 통해 브라우저에 저장하여 새로고침이나 페이지를 이동하였을 때도 테마를 유지합니다.
- 데이터 속성 변경을 통해 GlobalStyle에 정의한 테마를 적용합니다.

## 다크모드 토글하기
[useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) 훅을 사용하여 useDarkMode에서 반환한 테마 토글 함수를 전달합니다. 그리고 사용하려는 곳에서 useContext로 전달한 테마와 테마 토글 함수를 사용합니다.

```tsx
// pages/_app.tsx

import React, { createContext } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-style';
import { useDarkMode } from '../lib/useDarkMode';
import { themedPalette } from '../styles/theme';

type ThemeContextType = {
  theme: 'light' | 'dark' | null;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  toggleTheme: () => {
    return null;
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={themedPalette}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default MyApp;
```
```tsx
// useContext 훅 사용을 위한 간단한 예시일 뿐입니다.
// 자세한 사용법은 공식문서를 확인해 주세요.

import { useContext } from 'react';
import { ThemeContext } from '../../pages/_app';

const Component = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // 생략...
  );
};

export default Component;
```

## 다크모드 새로고침 시 깜빡임 해결하기
Next.js는 SSR 방식을 사용하기 때문에 서버단에서는 다크 모드로 보여줘야 할지 라이트 모드로 보여줘야 할지 알 수 없습니다. 그렇기 때문에 시스템 테마가 다크 모드로 설정되어 있는 사용자가 블로그로 들어오면 배경이 흰색인 화면(라이트 모드)을 보여줬다가 JS 로딩 후 배경이 검정색인 화면(다크 모드)을 보여주게 됩니다. 즉, 화면이 깜빡거리는 현상을 겪게됩니다.

이러한 문제를 해결하기 위해서 SSR 코드에서 [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)을 사용해서 data-theme을 직접 주입해주는 작업을 했습니다.
```tsx
// pages/_document.tsx

import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(context: any) {
    const ctx: DocumentContext = context;
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            function getUserPreference() {
              if(window.localStorage.getItem('theme')) {
                return window.localStorage.getItem('theme')
              }

              return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            }

            document.body.dataset.theme = getUserPreference();
          `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## 구현 화면
![다크모드](implementation.gif)

## 참고
>[벨로그 다크 모드 적용하기](https://velog.io/@velopert/velog-dark-mode)  
[다크모드 구현(typescript)](https://velog.io/@ongddree/%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84)  
[How to fix dark mode background color flicker in NextJS?](https://stackoverflow.com/questions/67094919/how-to-fix-dark-mode-background-color-flicker-in-nextjs)

