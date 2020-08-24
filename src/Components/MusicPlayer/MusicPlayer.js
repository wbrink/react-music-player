import React, {useState, useRef} from "react";
import styles from "./MusicPlayer.module.scss";

const MusicPlayer = (props) => {
  const audioRef = useRef(null);
  
  const [duration, setDuration] = useState();

  const PlayClick = () => {
    audioRef.current.play();    
  }

  const PauseClick = () => {
    audioRef.current.pause();
  }

  const timeUpdate = (e) => {
    // get duration of song
    // get the current time 
    // place the percentage as margin-left
    e.d
  }

  const canPlay = () => {
    console.log("the music is loaded and can play");

  }

  return (
    // container that holds play pause and slider
    <div>
      <audio src="/title.mp3" ref={audioRef} onTimeUpdate={timeUpdate} onCanPlayThrough={canPlay}></audio>
      <button onClick={PlayClick}>Play</button>
      <button onClick={PauseClick}>Pause</button>
      <div className={styles.timeline}>
        <div className={styles.scrub}></div>
      </div>
    </div>
  );
}
 
export default MusicPlayer;