import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from '@pages/home';
import { Global } from '@emotion/react';
import globalStyle from '@styles/global';
import { AccessProvider } from '@context/access';

const App = () => {
  return (
    <AccessProvider>
      <Global styles={globalStyle} />
      <Home />
    </AccessProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
