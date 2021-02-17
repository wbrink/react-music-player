import React, {useContext, createContext, useState} from "react";

const CurrentPlaylistContext = createContext();

export const CurrentPlaylistProvider = ({children}) => {
  const [currentPlaylist, setCurrentPlaylist] = useState([]); // will be an array of song objects that can be place in the songController

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