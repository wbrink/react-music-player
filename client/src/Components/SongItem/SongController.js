import React, {useState} from "react";
import SongItem from "./SongItem";
import {usePlaylist} from "../../utils/PlaylistContext";

// component expects following props
// songArray
// type: "artistSearch, search, library" 


const SongController = (props) => {
  
  const [currentSong, setCurrentSong] = useState("");
  const [playlist, setPlaylist] = usePlaylist();


  const handleClick = () => {
    console.log("clicked song");
  }
  
  if (props.songArray.length == 0) {
    console.error("Song Controller must have array of song objects");
    return (
      ""  
    )
  }

  return (
    props.songArray.map((obj, index) => {
      const value = playlist.includes(obj.track_id);
      return (
        <SongItem 
          type={props.type} 
          index={index+1}
          track_id={obj.track_id}
          album_art_path={obj.album_art_path}
          album_id={obj.album_id}
          artist_id={obj.artist_id}
          track_name={obj.track_name}
          artist_name={obj.artist_name}
          album_name={obj.album_name}
          duration={obj.duration}
          plays={props.type === "artistSearch" ? obj.plays : null }
          onClick={handleClick}
          favorite={value}
        /> 
      )
      
    })
  )
}

export default SongController;