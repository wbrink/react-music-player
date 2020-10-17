import React, { useState, useEffect } from 'react';
import styles from "./SongItem.module.scss";

const SongItem = (props) => {
  // const [active, setActive] = useState(false);
  let classes = `${styles.songItem}`;

  if (props.active) {
    classes += ` ${styles.active}`;
  }

  if (props.current) {
    classes += ` ${styles.playing}`
  }

  return (
    <li className={classes} onClick={props.onClick} onDoubleClick={props.onDoubleClick} draggable={true} >
      {/* play */}
      <div className={styles.playButton}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>
      </div>

      <div className={styles.song}>{props.title}</div>
      <div className={styles.artist}>{props.artist}</div>
      <div className={styles.album}>{props.album}</div>

    </li>
  );
}
 
export default SongItem;