import { css } from '@emotion/react';

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
};
setScreenSize();

const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@500&display=swap');

  :root {
    --theme-fore: #000000;
    --theme-back: #ffffff;
    --theme-indipink: #eec0c6;
    --theme-skyblue: #7ee8fa;
    --theme-black: #000000;
    --theme-white: #ffffff;
    --size-half: 5px;
    --size-base: 10px;
    --font-family-base: 'Noto Sans KR', 'sans-serif';
    --font-family-title: 'Black Han Sans';
    --font-size-sm: 12px;
    --font-size-base: 15px;
    --font-size-lg: 24px;
    --font-size-title: 50px;
    --font-weight-light: 100;
    --font-weight-normal: 400;
    --font-weight-bold: 700;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --theme-fore: #ffffff;
      --theme-back: #000000;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    background: unset;
    color: var(--theme-fore);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
    vertical-align: middle;
    text-decoration-line: none;
  }

  body {
    background-color: var(--theme-back);
    background: linear-gradient(to right, var(--theme-skyblue), var(--theme-indipink));
  }

  #root {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  #container {
    width: 600px;
    height: 100vh;
    background-color: var(--theme-back);
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    #root {
      width: 100vw;
    }
  }
`;

export default globalStyle;
