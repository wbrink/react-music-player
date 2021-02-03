import React, {useContext, useState, createContext, useEffect} from "react";

const PlaylistContext = createContext();


export const PlaylistProvider = ({children}) => {
  // this will be array of song objects that contain things like track_id and track_path, track_name, duration
  const [playlist, setPlaylist] = useState([]);


  return (
    <PlaylistContext.Provider value={[playlist, setPlaylist]}>
      {children}
    </PlaylistContext.Provider>
  )
}


export const usePlaylist = () => {
  const context = useContext(PlaylistContext);

  if (context === undefined) {
    throw new Error("usePlaylist must be used within PlaylistProvider");
  }

  return context;
}
