import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }


  body {
    margin: 0;
    font-size: 1.125rem;
    color: #252525;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  code {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }


  a {
    text-decoration: none;
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
