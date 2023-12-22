import { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  // Obtener la información almacenada en localStorage al inicio
  const storedUserData = localStorage.getItem('userData');
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : {
    firstName: '',
    lastName: '',
    email: '',
  };

  const [userData, setUserDataState] = useState(initialUserData);

  const setUserData = (data) => {
    setUserDataState(data);
    // Almacenar la información en localStorage cada vez que se actualice
    localStorage.setItem('userData', JSON.stringify(data));
  };

  useEffect(() => {
    // Limpiar la información almacenada al cerrar sesión
    if (!userData.email) {
      localStorage.removeItem('userData');
    }
  }, [userData]);

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