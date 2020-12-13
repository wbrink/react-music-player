import React, {useState} from "react";
import SongItem from "./SongItem";

// component expects following props
// songArray
// type: "artistSearch, search, library" 


const SongController = (props) => {
  
  const [currentSong, setCurrentSong] = useState("");

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
      return ( 
        <SongItem 
          type={props.type} 
          index={index+1}
          album_art_path={obj.album_art_path}
          track_name={obj.track_name}
          artist_name={obj.artist_name}
          album_name={obj.album_name}
          duration={obj.duration}
          plays={props.type === "artistSearch" ? obj.plays : null }
          onClick={handleClick}

        />
      )
    })
  )
}

export default SongController;