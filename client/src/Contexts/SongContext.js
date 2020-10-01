import React, { useState, useContext } from "react";

const SongContext = React.createContext();

function SongProvider({children}) {
  const [song, setSong] = useState();

  return (
    <SongContext.Provider value={[song, setSong]}>
      {children}
    </SongContext.Provider>
  )
}

function useSongState() {
  const context = useContext(SongContext);

  if (context === undefined) {
    throw new Error("useSongState must be used within a CountProvider")
  }

  return context;
}


export {SongProvider, useSongState}