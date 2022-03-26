import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-variant-ligatures: no-common-ligatures;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }

  input {
    outline: none;
  }

  button {
    border: none;
    background-color: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    
    &:focus {
      outline: 0;
    }
  }
`;

export default GlobalStyle;
