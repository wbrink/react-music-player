import React, { Component, useEffect } from 'react';
import styles from "./Library.module.scss";
import SongItem from "../SongItem/SongItem";
// import songs from "../../songs.json"
import { useState } from 'react';

import {useLibraryState} from "../../Contexts/LibraryContext";
import {useSongState} from "../../Contexts/SongContext";



const Library = (props) => {
  const [currentSong, setCurrentSong] = useState();
  

  // handles the library of songs
  const [library, setLibrary] = useLibraryState();
  const [song, setSong] = useSongState(); // handles the song that the music player will play

  if (library === undefined) {
    return (
      <div className={styles.container}>
        <h1>Loading...</h1> 
      </div>
    )
  } else if (library.length == 0) {
    return (
      <div className={styles.container}>
        <h1>No songs Available</h1> 
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ul>
        {library.map((s, index) => <SongItem key={s.id} number={index} active={s === currentSong} artist={s.artist} title={s.title} album={s.album} onClick={() => setCurrentSong(s)}/> )}
      </ul>
    </div>
  );
}
 
export default Library;