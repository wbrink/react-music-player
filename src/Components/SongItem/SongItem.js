import React, { useState, useEffect } from 'react';
import styles from "./SongItem.module.scss";

const SongItem = (props) => {
  console.log(props.active);
  return (
    <div className={props.active ? `${styles.songItem} ${styles.active}` : styles.songItem}>
      {/* play */}
      <div className={styles.playButton}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>
      </div>

      <div className={styles.song}>{props.song}</div>

      <div className={styles.artist}>{props.artist}</div>
      <div className={styles.album}>{props.album}</div>

    </div>
  );
}
 
export default SongItem;