import React, {useState, useEffect} from "react";
import { usePlaylist } from "../../utils/PlaylistContext";
import styles from "./SongItem.module.scss";


// library, artistSearch, search 
// these all have slight variations on how to lay them out
const SongItem = (props) => {
  // console.log("songItem Props", props);
  const  [favorite, setFavorite] = useState();
  const [playlist, setPlaylist] = usePlaylist();

  const handleFavorite = (e,id) => {
    if (playlist.includes(id)) {
      // then we need to remove the song from library
      fetch("/api/user/remove-from-library", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id})
      })
       .then(res => res.json())
       .then(data => {
          if (data.success) {
           // change state for playlist
            console.log("props", {...props});
            setPlaylist(playlist.filter(item => item !== id)); // filter the array to get the results we want
            console.log('trying to delete from the playlist');
         }
       })
       .catch(error => {
         console.log(error);
       })
    } else {
      fetch("/api/user/add-to-library", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: id})
      })
       .then(res => res.json())
       .then(data => {
          if (data.success) {
           // change state for playlist
            console.log("made fetch to /api/user/add-to-library");
            setPlaylist([...playlist, id]);
         }
       })
       .catch(error => {
         console.log(error);
       })
    }
  }

  // useEffect(() => {
  //   console.log("playlist", playlist);
  // }, [playlist])

  if (props.type === "search") {
    return (
      // index, album_art_path, track_name, artist_name, album_name, duration, 
      <div className={styles.song}>
        <div className={styles.mainSongInfo}>
          <div className={styles.index}>{props.index}</div>
          <img className={styles.songImage} src={props.album_art_path} alt="picture of album art"/>
          <div className={styles.titleArtist}>
            <h4 className={styles.songTitle}>{props.track_name}</h4>
            <p className={styles.songArtist}>{props.artist_name}</p>
          </div>
        </div>
        

        <div>
          <p>{props.album_name}</p>
        </div>
  
        <div className={styles.songDuration}>
          <p>{getFormattedSongDuration(props.duration)}</p>
        </div>
  
        <div className={styles.callToAction} >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={props.favorite ? styles.favorite : ''} viewBox="0 0 16 16" onClick={(e) => handleFavorite(e, props.track_id)}>
            <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>
        </div>
      </div>
    )
  }

  if (props.type === "artistSearch") {
    return (
      <div className={styles.songArtistSearch}>
        <div className={styles.mainSongInfo}>
          <div className={styles.index}>{props.index}</div>
          <img className={styles.songImage} src={props.album_art_path} alt="picture of album"/>
          <div>{props.track_name}</div>
        </div>
        
        <div>{props.plays}</div>
        
        <div className={styles.durationAndAction}>
          <div>{getFormattedSongDuration(props.duration)}</div>
          <div className={styles.callToAction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={props.favorite ? styles.favorite : ''} viewBox="0 0 16 16" onClick={(e) => handleFavorite(e,props.track_id)}>
              <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
            </svg>
          </div>   
        </div>
         
      </div>
    )
  }
  
}


// turns seconds into mm:ss format (i.e 151 = 2:31)
const getFormattedSongDuration = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let secondsFormatted = seconds % 60;

  return `${minutes}:${secondsFormatted}`;
}

export default SongItem;