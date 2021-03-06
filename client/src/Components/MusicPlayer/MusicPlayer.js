import React, {useState, useRef, useEffect} from "react";
import styles from "./MusicPlayer.module.scss";

import SongProgress from "./SongProgess";

import {useCurrentPlaylist} from "../../utils/CurrentPlaylistContext"; // this is the context that gives the current playlist that is playing (library or search results) that is now how this is going to wr
import {useLocation} from "react-router-dom";
import { useMusic } from "../../utils/MusicContext";

const MusicPlayer = (props) => {
  const [currentPlaylist] = useCurrentPlaylist();
  const audioRef = useRef(null);
  let location = useLocation();
  let [music, setMusic] = useMusic();
  
  const [play, setPlay] = useState(false); // if false show the play button if true show the pause button
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);

  // changes the button to play if pause and vice versa
  const PlayPauseClick = () => {
    // if song is paused or not playing
    if (!play) {
      audioRef.current.play();
      console.log(audioRef.current.src)
      setPlay(true); 
    } else {
      audioRef.current.pause();
      setPlay(false);
    }
  }

  const changeTime = (percentage) => {
    audioRef.current.currentTime = percentage * duration;
  }
  
  // event that fires when the song is loaded and no buffering is necessary
  const canPlay = () => {
    setDuration(audioRef.current.duration);
  }

  // press back on the music player
  const backClick = () => {
    // if (audioRef.current.currentTime > 2) {
    //   audioRef.current.currentTime = 0;
    // } else {
    //   if (props.state.index == 0) {
    //     audioRef.current.currentTime = 0;
    //   } else {
    //     props.setState((prevState) => {
    //       return {...prevState, index: prevState.index - 1}
    //     })
    //   }
    // }
    console.log('clicked prev button on music player');
  }

  const fwdClick = () => {
    // if (props.state.onLibrary) {
    //   if (props.state.index < props.state.library.length - 1) {
    //     props.setState((prevState) => {
    //       return {...prevState, index: prevState.index + 1}
    //     })
    //   } else {
    //     props.setState((prevState) => {
    //       return {
    //         ...prevState, 
    //         index: 0
    //       }
    //     })
    //   }
    // }
    console.log("clicked next button on music player");
  }

  // runs after first render and every time props.state.play runs
  // useEffect(() => {
  //   if (props.state.play == true) {
  //     setPlay(true);
  //     audioRef.current.play();
  //   }
  // }, [props.state.play, props.state.index])

  
  // sets the audio element with the correct source
  // if (props.state.onLibrary && props.state.library.length == 0) {
  //   return "";
  // } else if (props.state.onLibrary && props.state.library.length > 0) {
  //   audioElement = <audio src={props.state.library[props.state.index].songURL} ref={audioRef} onTimeUpdate={(e) => {setSeek(e.target.currentTime)}} onCanPlay={canPlay} ></audio>
  //   songToPlay = props.state.library[props.state.index];
  // } else {
  //   if (props.state.altPlayList.length == 0) {
  //     return "";
  //   } else {
  //     audioElement = <audio src={props.state.altPlayList[props.state.index].songURL} ref={audioRef} onTimeUpdate={(e) => {setSeek(e.target.currentTime)}} onCanPlay={canPlay} ></audio>
  //   }
  // }

  // if we are in login don't show the player 
  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null
  }



  return (
    // container that holds play pause and slider
    <div className={styles.container}>
      
      {/* {audioElement} */}
      <audio src={currentPlaylist[0]} ref={audioRef} onTimeUpdate={(e) => {setSeek(e.target.currentTime)}} onCanPlay={canPlay} ></audio>

      {/* new timeline that uses an input */}
      <SongProgress duration={duration} changeTime={changeTime} audio={audioRef} value={seek}/>

      {/* <input type="range" ref={timeInputRef} className={styles.rangeInput} onChange={changeTime} value={seek}/> */}


      {/* subcontainer that holds other info */}
      {currentPlaylist.length == 0
        ? <h1>Hello World</h1>
        : <div className={styles.subContainer}>
            <div className={styles.musicInfo}>
              <img src="./cover.jpg" alt="" id={styles.album}/>
              <div className={styles.songInfo}>
                <p>{currentPlaylist[currentIndex]}</p>
                <p>{songToPlay.artist}</p>
              </div>
            </div>

            <div className={styles.controls}>            
              <div className={styles.controlButtons}>
                {/* skip backward */}
                <svg className={styles.ctrlButtonSmaller} onClick={backClick} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5z"/>
                  <path d="M.904 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.692-1.01-1.233-.696L.904 7.304a.802.802 0 0 0 0 1.393z"/>
                  <path d="M8.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L8.404 7.304a.802.802 0 0 0 0 1.393z"/>
                </svg>
                

                  
                {/* play button */}
                {!play && 
                  <svg className={styles.ctrlButton} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" onClick={PlayPauseClick}>
                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                }

                {/* pause button */}
                {play && 
                  <svg className={styles.ctrlButton} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={PlayPauseClick}>
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                  </svg>
                }
                
                {/* skip forward */}
                <svg className={styles.ctrlButtonSmaller} onClick={fwdClick} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.596 8.697l-6.363 3.692C.693 12.702 0 12.322 0 11.692V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  <path d="M15.096 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
                {/* <button onClick={PauseClick}>Pause</button> */}
              </div>
            </div>

            <div className="volume">
              {/* <svg width="1em" height="1em" viewBox="0 0 16 16" className={styles.ctrlButtonSmaller} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"/>
                <path fillRule="evenodd" d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"/>
              </svg> */}
            </div>
          </div>
      }
    </div>
  );
}
 
export default MusicPlayer;