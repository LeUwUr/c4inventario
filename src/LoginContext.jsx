import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
      });

  return (
    <LoginContext.Provider value={{ userData, setUserData }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext debe usarse dentro de un LoginProvider');
  }
  return context;
};