import React from "react";
import { useSearchResults } from "../../utils/SeachContext";
import styles from "./Search.module.scss";
import {useHistory} from "react-router-dom";

import SongController from "../SongItem/SongController";



const Search = (props) => {
  let history = useHistory();
  const searchResult = useSearchResults()[0]; // just want the search results not the ability to change them

  const handleArtistClick = (id, artist_name) => {
    // switch routes to artist
    history.push(`/artist/${artist_name}/${id}`);
  }
  
  // searchResult will return false if nothing in search bar
  if (!searchResult) {
    return ('');
  }

  // if search contains no results notify the user
  if (searchResult === "no results found") {
    return (
      <div className ={styles.container}>
        <div className={styles.section}>
          <h1>No Results Found</h1>
        </div>
        
      </div>
    );
  }

  return (
    <div className ={styles.container}>
      <section className={styles.section}>
        <h1>Songs</h1>
        {searchResult.tracks.length !== 0 && <SongController songArray={searchResult.tracks} type="search" /> }

        {/* {searchResult.tracks.length !== 0 && searchResult.tracks.map((obj, index) => {
          return (
            <div className={styles.song}>
              <div className={styles.mainSongInfo}>
                <div className={styles.index}>{index + 1}</div>
                <img className={styles.songImage} src={obj.album_art_path} alt="picture of album art"/>
                <div className={styles.titleArtist}>
                  <h4 className={styles.songTitle}>{obj.track_name}</h4>
                  <p className={styles.songArtist}>{obj.artist_name}</p>
                </div>
              </div>
              

              <div>
                <p>{obj.album_name}</p>
              </div>

              <div className={styles.songDuration}>
                <p>{getFormattedSongDuration(obj.duration)}</p>
              </div>

              <div className={styles.callToAction}>
                <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
              </div>
            </div>
          )})
        }  */}
        
      </section>

      <div className={styles.section}>
        <h1>Artists</h1>
        {/* map over the artist and give circular pic and text underneath */}
        <div className={styles.artistSection}>
          {searchResult.artists.map((obj, index) => {
            return (
              <div className={styles.artistCard} onClick={() => handleArtistClick(obj.artist_id, obj.artist_name)}>
                <img src={obj.artist_picture_path} alt=""/>
                <h3>{obj.artist_name}</h3>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.section}>
        <h1>Albums</h1>
        {/* map over the albums */}
        <div className={styles.artistSection}>
          {searchResult.albums.map((obj, index) => {
            return (
              <div className={styles.artistCard}>
                <img className={styles.albumCover} src={obj.album_art_path} alt=""/>
                <p className={styles.primaryText}>{obj.album_name}</p>
                <p className={styles.secondaryText}>{obj.artist_name}</p>
              </div>
            )
          })}
        </div>
      </div>
    
    </div>
    
  )
}

export default Search;


const getFormattedSongDuration = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let secondsFormatted = seconds % 60;

  return `${minutes}:${secondsFormatted}`;
}