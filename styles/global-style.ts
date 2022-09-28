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
    background-color: ${({ theme }) => theme.bgColor.primary};
    color: ${({ theme }) => theme.text.secondary}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text.primary};
  }

  code {
    color: #82E0AA;
  }


  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text.primary}
  }

  ul, li {
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
`;
