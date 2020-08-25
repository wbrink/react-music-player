import React, {useState, useRef} from "react";
import styles from "./MusicPlayer.module.scss";

const MusicPlayer = (props) => {
  const audioRef = useRef(null);
  const scrubRef = useRef(null);
  
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
    let percentage = (audioRef.current.currentTime / duration) * 100;
    console.log(percentage);
    scrubRef.current.style.marginLeft = `${percentage}%`;
  }

  const canPlay = () => {
    setDuration(audioRef.current.duration);
  }

  // when user clicks somewhere on timeline
  const setPosition = (e) => {
    const timeLineWidth = e.target.getBoundingClientRect().width;
    const timeLineX = e.target.getBoundingClientRect().left;
    const clickedX = e.clientX;

    const percentage = (clickedX - timeLineX) / timeLineWidth * 100;
    console.log("percentage", percentage);


    // set the scrub to the new margin left
    scrubRef.current.style.marginLeft = `${percentage}%`;

    // get the percentage 

  } 

  return (
    // container that holds play pause and slider
    <div>
      <audio src="/humidity.mp3" ref={audioRef} onTimeUpdate={timeUpdate} onCanPlayThrough={canPlay}></audio>
      <button onClick={PlayClick}>Play</button>
      <button onClick={PauseClick}>Pause</button>

      {/* timeline */}
      <div className={styles.timeline} onClick={setPosition}>
        {/* scrub */}
        <div className={styles.scrub} ref={scrubRef}></div>
      </div>
    </div>
  );
}
 
export default MusicPlayer;