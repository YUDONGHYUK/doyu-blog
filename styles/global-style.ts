import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  /* ${reset} */
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: #252525;
    font-family: "GmarketSansMedium";
  }

  h1,
  h2,
  h3 {
    font-family: sans-serif;
  }


  a {
    text-decoration: none;
  }
  
  button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
`;
