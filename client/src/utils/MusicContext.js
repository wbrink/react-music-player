import React, {useContext, useState, createContext} from "react";

const MusicContext = createContext(null);

export const MusicProvider = ({children}) => {
  const [music, setMusic] = useState({
    currentPlaylist: [],
    index: 0,
    playing: false
  });

  return (
    <MusicContext.Provider value={[music,setMusic]}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)

  if (context == undefined) {
    throw new Error("context must be used within IndexContextProvider");
  }

  return context;
}

