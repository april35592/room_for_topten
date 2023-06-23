import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from '@pages/home';
import { Global } from '@emotion/react';
import globalStyle from '@styles/global';

const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <Home />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
