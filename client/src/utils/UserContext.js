import React, {createContext, useContext, useState} from "react";


const UserContext = createContext();


export const UserProvider = ({children}) => {
  const [user, setUser] = useState({
      username: "",
      email: "",
      user_id: "", // number
      joined: "" // date
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider")
  }

  return context;
}