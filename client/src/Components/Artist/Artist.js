import React, {useEffect, useState} from "react";
import styles from "./Artist.module.scss";
import {useParams} from "react-router-dom";
import SongController from "../SongItem/SongController";
import {useHistory} from "react-router-dom";

const Artist = () => {
  const {name, id} = useParams();
  const [artistInfo, setArtistInfo] = useState();
  let history = useHistory();
  const handleAlbumClick = (album_id) => {
    console.log(album_id);
    history.push(`/album/${album_id}`);
  }

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
      <div className={styles.section}>
        <h1>{name}</h1>
        {/* this will display the songs */}
        <SongController 
          type="artistSearch"
          songArray={artistInfo.tracks}
        />  
      </div>

      <div className={styles.section}>
        <h1>Discography</h1>
        <div className={styles.artistSection}>
          {artistInfo.albums.map((obj, index) => {
            return (
              <div className={styles.artistCard} onClick={() => handleAlbumClick(obj.album_id)}>
                <img className={styles.albumCover} src={obj.album_art_path} alt=""/>
                <p className={styles.primaryText}>{obj.album_name}</p>
                <p className={styles.secondaryText}>{obj.artist_name}</p>
              </div>
            )
          })}
        </div>
      </div>
      
      
        
    </div>
  )
}

export default Artist;