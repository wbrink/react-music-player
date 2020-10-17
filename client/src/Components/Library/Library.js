import React, { Component, useEffect } from 'react';
import styles from "./Library.module.scss";
import SongItem from "../SongItem/SongItem";
// import songs from "../../songs.json"
import { useState } from 'react';

import {useLibraryState} from "../../Contexts/LibraryContext";
import {useSongState} from "../../Contexts/SongContext";



const Library = (props) => {
  const [currentSong, setCurrentSong] = useState();
  const [songPlaying, setSongPlaying] = useState(); // when songItem is double clicked then the text will turn teal or purple

  const setState = props.setState; // setting the state from 
  const {library, index} = props.state;

  const handleClick = (e,song, songIndex ) => {
    setCurrentSong(song);
    console.log(songIndex)
  }

  const handleDoubleClick = (e, song, songIndex ) => {

    setCurrentSong(song);
    setSongPlaying(song);
    setState((prevState) => {
      return {...prevState, index: songIndex, play: true};
    })
  }
  

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
    <div className={styles.container} style={{padding: "1px"}}>
      <h1 style={{marginLeft: "23px", marginBottom: "20px", marginTop: "20px", padding: "1px"}}>Library</h1>
      <ul>
        {library.map((s, songIndex) => <SongItem key={s.id} current={index == songIndex} playing={s=== songPlaying} active={s === currentSong} artist={s.artist} title={s.title} album={s.album} onClick={(e) => handleClick(e, s, songIndex)} onDoubleClick={(e) => handleDoubleClick(e, s, songIndex)}/> )}
      </ul>
    </div>
  );
}
 
export default Library;