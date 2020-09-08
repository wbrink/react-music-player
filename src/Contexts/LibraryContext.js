import React, {createContext, useState, useContext, useEffect} from "react";

// import the data
import data from "../songs.json";

const LibraryContext = createContext();

// gets the library of songs
function LibraryProvider({children}) {
  const [library, setLibrary] = useState()

  // fetch the library data (run after component mounts)
  useEffect(() => {
    setLibrary(data); 
    console.log("in provider", data);
  }, [])

  return (
    <LibraryContext.Provider value={[library, setLibrary]}>
      {children}
    </LibraryContext.Provider>
  )
}


// use context like a hook
function useLibraryState() {
  const context = useContext(LibraryContext)

  if (context === undefined) {
    throw new Error("useSongState must be used within a CountProvider")
  }

  return context;
}



export {LibraryProvider, useLibraryState }