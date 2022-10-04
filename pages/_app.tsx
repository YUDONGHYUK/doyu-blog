import React, { createContext } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
  theme: 'light',
  toggleTheme: () => {
    return null;
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Doyu blog</title>
      </Head>
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
