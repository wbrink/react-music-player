import React from "react";
import styles from "./SongProgress.module.scss"
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";


const SongProgress = (props) => {
  const timeLineRef = useRef(null);
  const scrubRef = useRef(null);
  const scrubTrailerRef = useRef(null);
  let percentage;

  const [mouseDownState, setMouseDownState] = useState(false);


  // move scrub and trailing color
  const clickTimeline = (e) => {
    const rect = timeLineRef.current.getBoundingClientRect();
    const elementLeft = rect.left;
    const clientLeft = e.clientX;

    let difference = clientLeft - elementLeft -5 ; // the 5 accounts for the width of the scrub

    // move the scrub and its trailing color
    scrubRef.current.style.left = difference + "px";
    scrubTrailerRef.current.style.width = difference + "px"; 
  }


  const mouseDown = (e) => {
    console.log("mouse Down");

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);   
    
    // on mouse down we don't want to move 
    setMouseDownState(true);
  }

  const mouseMove = (e) => {
    // get the total pixels of timeline
    let leftBound = timeLineRef.current.getBoundingClientRect().left;
    let rightBound = timeLineRef.current.getBoundingClientRect().right;
    let width = rightBound - leftBound;


    // don't move the scrub past the bounds of the timeline
    if (e.clientX <= rightBound && e.clientX >= leftBound) {
      scrubRef.current.style.left = e.clientX - leftBound - 5 + "px"; // the 5 takes into account the size of the circle to place the circle in the middle
      percentage = (e.clientX - leftBound) / width;
      scrubTrailerRef.current.style.width = e.clientX - leftBound + "px";
      console.log(percentage + "%")
    }
    

    // call function that changes the duration
  }

  const mouseUp = () => {
    props.changeTime(percentage);
    
    console.log("mouse up");
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
  }

  // runs on all re-renders
  useEffect(() => {
    if (!mouseDownState) {
      let leftBound = timeLineRef.current.getBoundingClientRect().left;
      let rightBound = timeLineRef.current.getBoundingClientRect().right;
      let width = rightBound - leftBound;

      let percentageSongPlayed = props.value / props.duration;

      scrubRef.current.style.left = percentageSongPlayed * width + "px";
      scrubTrailerRef.current.style.width = percentageSongPlayed * width + "px"; 
      console.log("seek", props.value / props.duration);
    } else {
      return;
    }
  })

  
  return (
    <div className={styles.timeLine} ref={timeLineRef} onClick={clickTimeline}>
      {/* piece to scrub timeline */}
      <div className={styles.scrub} ref={scrubRef} onMouseDown={mouseDown} ></div>
      {/* color line that trails the scrub */}
      <div className={styles.scrubTrailer} ref={scrubTrailerRef}></div>
    </div>
  )
  
}

export default SongProgress;