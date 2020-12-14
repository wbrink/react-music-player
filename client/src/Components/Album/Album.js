import React, { useEffect, useState } from "react";
import styles from "./Album.module.scss";
import { useParams } from "react-router-dom";

const Album = () => {
  let {id} = useParams(); // get the album id from the url parameter
  const [albumInfo, setAlbumInfo] = useState("AlbumInfo empty");

  // run when component mounts
  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = {signal: abortCtrl.signal}

    fetch(`/api/album/${id}`, opts)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAlbumInfo({
          songs: data[0],
          albumLength: data[0].length,
          artistName: data[0].artist_name,
          albumID: data[0].album_id,
          artistID: data[0].artist_id,
          artistPicture: data[0].artist_picture_path,
          albumPicture: data[0].album_art_path,
          albumName: data[0].album_name
        })
      })
      .catch(error => {
        console.error(error);
      })

    return () => {
      abortCtrl.abort();
    }

  }, []) 

  
  return (
    <div className="no-padding container">
      <div className={styles.hero}>
        <img src={albumInfo.albumPicture} alt="picture of album"/>
        <div>
          <div>Album</div>
          <div>{albumInfo.albumName}</div>
          <div>
            <img src={albumInfo.artistPicture} alt="picture of artist"/>
            <div>{albumInfo.artistName}</div>
            <div>{albumInfo.albumLength}</div>
          </div>
        </div>
        <div>{JSON.stringify(albumInfo)}</div>
      </div>
      
    </div>
    

  )
}

export default Album;