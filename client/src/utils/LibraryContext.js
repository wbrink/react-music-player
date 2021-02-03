import React, {useContext, createContext, useState} from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({children}) => {
  const [library, setLibrary] = useState([]);

  return (
    <LibraryContext.Provider value={[library, setLibrary]}>
      {children}
    </LibraryContext.Provider>
  )
}

export const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (context === undefined) {
    throw new Error("useLibrary must be used within LibraryProvider");
  }

  return context;
}