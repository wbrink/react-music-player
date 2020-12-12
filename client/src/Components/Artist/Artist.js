import React, {useEffect, useState} from "react";
import styles from "./Artist.module.scss";
import {useParams} from "react-router-dom";

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

      {artistInfo.tracks.map((obj, index) => {
        return (
          <div className={styles.songs}>
            <div>{index + 1}</div>
            <img src={obj.album_art_path} alt="picture of album"/>
            <div>{obj.track_name}</div>
            <div>{obj.plays}</div>
            <div className={styles.callToAction}>
              <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
              </svg>
            </div>    
          </div>
        )
      })}
      
      
    </div>
  )
}

export default Artist;