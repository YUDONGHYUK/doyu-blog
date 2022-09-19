import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto&family=Source+Sans+Pro:wght@300&display=swap');   

  ${reset}
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
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
