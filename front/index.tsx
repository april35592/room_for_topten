import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from '@pages/home/index';

const App = () => {
  return (
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
