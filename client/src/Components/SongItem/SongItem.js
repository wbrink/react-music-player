import React, {useState, useEffect} from "react";
import styles from "./SongItem.module.scss";

// library, artistSearch, search 
// these all have slight variations on how to lay them out
const SongItem = (props) => {
  // console.log("songItem Props", props);

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
  
        <div className={styles.callToAction}>
          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
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
          <div>{props.duration}</div>
          <div className={styles.callToAction}>
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
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