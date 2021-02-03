import React, { createContext, useContext, useState } from 'react';
import useProvideAuth from "./useProvideAuth";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context;
}