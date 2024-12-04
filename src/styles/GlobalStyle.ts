import { createGlobalStyle } from "styled-components";
import { foundations } from "./foundation";

const GlobalStyle = createGlobalStyle`
  :root {
    /* 기존 CSS 변수들 */
    --main-color: ${({ theme }) => theme.mainColor};
    --sub-color: ${({ theme }) => theme.subColor};
    --text-color: ${({ theme }) => theme.textColor};
    --bg-color: ${({ theme }) => theme.bgColor};
    --sub-alt-color: ${({ theme }) => theme.subAltColor};
    
    /* 공통 간격 */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* 공통 폰트 크기 */
    --font-scale: 1;
    --font-size-sm: calc(0.875rem * var(--font-scale));
    --font-size-md: calc(1rem * var(--font-scale));
    --font-size-lg: calc(1.25rem * var(--font-scale));
    --font-size-xl: calc(1.5rem * var(--font-scale));
  }

  html, body {
    background-color: ${foundations.colors.background};
    color: ${foundations.colors.text};
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
