import { createGlobalStyle } from 'styled-components';

// the `theme` object is comming from our ./themes.js file
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
`
