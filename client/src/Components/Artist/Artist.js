import React, {useEffect, useState} from "react";
import styles from "./Artist.module.scss";
import {useParams} from "react-router-dom";
import SongController from "../SongItem/SongController";

const Artist = () => {
  const {name, id} = useParams();
  const [artistInfo, setArtistInfo] = useState();

  // runs once on mount
  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = {signal: abortCtrl.signal}

    // get the info for the artist
    fetch(`/api/artist/${id}`, opts)
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        // we recieve array of arrays containing objects. data[0] contains array of track objects
        // data[1] contains array of album objects
        setArtistInfo({
          tracks: data[0],
          albums: data[1]
        })
      })
      .catch(error => {
        console.log("error", error)
      })

    return () => {
      abortCtrl.abort();
    }
  }, [])

  // if fetch is not completed then don't show any content
  if (!artistInfo) {
    return (
      ""
    )
  }

  return (
    <div className ={styles.container}>
      <h1>{name}</h1>
      {/* this will display the songs */}
      <SongController 
        type="artistSearch"
        songArray={artistInfo.tracks}
      />    
    </div>
  )
}

export default Artist;