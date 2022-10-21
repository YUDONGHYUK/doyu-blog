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

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.125rem;
    font-weight: 300;
    background-color: var(--bg-page);
    color: var(--text2);
  }

  h1,
  h2,
  h3 {
    margin-top: 2rem;
    font-weight: bold;
    color: var(--text1);
  }

  h4,
  h5,
  h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.7rem;
  }

  code {
    color: var(--primary);
  }


  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul, li {
    margin: 0;
    padding: 0;
  }

  ul {
    margin-top: 0.5rem;

    li {
      margin-left: 1.2rem;
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
  }

  ol {
    margin-top: 0.5rem;

    li {
      margin-left: 1.2rem;
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
  }

  p {
    margin: 0;
    margin-bottom: 1.25rem;
    padding: 0;
    line-height: 1.8rem;
  }
  
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  input { 
    outline: none;
  }

  strong {
    color: var(--text-strong)
  }
`;
