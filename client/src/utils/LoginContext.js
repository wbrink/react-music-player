import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();


export const LoginProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      {children}
    </LoginContext.Provider>
  )
}


export const useLogin = () => {
  const context = useContext(LoginContext);

  if (context === undefined) {
    throw new Error("useLogin must be used within LoginProvider")
  }

  return context;
}