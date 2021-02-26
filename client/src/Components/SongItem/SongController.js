import React, {useState} from "react";
import SongItem from "./SongItem";
import {useLibrary} from "../../utils/LibraryContext";

// component expects following props
// songArray
// type: "artistSearch, search, library" 


const SongController = (props) => {
  let library_ids = []; //array of integers which are library ids
  const [currentSong, setCurrentSong] = useState("");
  const {library, setLibrary} = useLibrary();

  const handleClick = () => {
    console.log("clicked song");
  }
  
  if (props.songArray.length == 0) {
    console.error("Song Controller must have array of song objects");
    return (
      ""  
    )
  } else {
    library_ids = library.map(obj => obj.track_id);
  }

  return (
    props.songArray.map((obj, index) => {
      const value = library_ids.includes(obj.track_id);
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