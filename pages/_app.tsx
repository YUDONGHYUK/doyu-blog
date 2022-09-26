import React, { createContext } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-style';
import { lightTheme, darkTheme, ThemeType } from '../styles/theme';
import { useDarkMode } from '../lib/useDarkMode';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {
    return null;
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useDarkMode();

  const themeMode = theme === lightTheme ? lightTheme : darkTheme;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Doyu blog</title>
      </Head>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ThemeProvider theme={themeMode}>
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
