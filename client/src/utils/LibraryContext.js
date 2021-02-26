import React, {useContext, useState, createContext, useEffect} from "react";

const LibraryContext = createContext();


export const LibraryProvider = ({children}) => {
  const library = useProvideLibrary();

  return (
    <LibraryContext.Provider value={library}>
      {children}
    </LibraryContext.Provider>
  )
}


export const useLibrary = () => {
  const context = useContext(LibraryContext);

  if (context === undefined) {
    throw new Error("useLibrary must be used within PlaylistProvider");
  }

  return context;
}


export const useProvideLibrary = () => {
  const [library, setLibrary] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadLibrary = () => {
    fetch("/api/user/library")
      .then(res => res.json())
      .then(data => {
        console.log("data from useProvideLibrary", data);
        setLibrary(data);
      })
      .catch(error => {throw error})
      .then(() => setLoaded(true))
  }

  return {
    loaded,
    loadLibrary,
    library,
    setLibrary
  }
}