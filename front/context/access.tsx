import React, { createContext, useState } from 'react';

const AccessContext = createContext({
  latestAccess: '',
  newAccess: (user_id: string): void => {},
});

type AccessProviderProps = {
  children: React.ReactNode;
};

export const AccessProvider = ({ children }: AccessProviderProps) => {
  const [latestAccess, setAccess] = useState('');
  const newAccess = (user_id = '') => {
    setAccess(user_id);
  };

  return <AccessContext.Provider value={{ latestAccess, newAccess }}>{children}</AccessContext.Provider>;
};

export default AccessContext;
