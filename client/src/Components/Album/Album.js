import React, { useEffect, useState } from "react";
import styles from "./Album.module.scss";
import { useParams } from "react-router-dom";
import SongController from "../SongItem/SongController";



const Album = () => {
  let {id} = useParams(); // get the album id from the url parameter
  const [albumInfo, setAlbumInfo] = useState(false);

  // run when component mounts
  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = {signal: abortCtrl.signal}
    

    fetch(`/api/album/${id}`, opts)
      .then(res => res.json())
      .then(data => {
        console.log('data from fetch', data);
        setAlbumInfo({
          songs: data,
          albumLength: data.length,
          artistName: data[0].artist_name,
          albumID: data[0].album_id,
          artistID: data[0].artist_id,
          artistPicture: data[0].artist_picture_path,
          albumPicture: data[0].album_art_path,
          albumName: data[0].album_name,
          releaseDate: data[0].release_date.substring(0,4),
          albumDuration: getAlbumDuration(data)
        })        
      })
      .catch(error => {
        console.error(error);
        setAlbumInfo(false);
      })

    return () => {
      abortCtrl.abort();
    }

  }, []) 

  if (albumInfo === false) {
    return ("");
  }
  
  return (
    <div className=" no-padding container">
      
      <div className={styles.hero}>
        <img className={styles.albumCover} src={albumInfo.albumPicture} alt="picture of album"/>
        <div className={styles.albumMisc}>
          <h2>{albumInfo.albumName}</h2>          
          <div className={styles.info}>
            <img src={albumInfo.artistPicture} alt="picture of artist"/>
            <div className={styles.artistName}>{albumInfo.artistName}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>
              <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>
            </svg>
            <div>{albumInfo.releaseDate}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>
              <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>
            </svg>
            <div>{albumInfo.albumLength} Songs</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path fill-rule="evenodd" d="M9 3v10H8V3h1z"/>
              <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"/>
            </svg>
            <div style={{fontSize: "12px"}}>
              {albumInfo.albumDuration}
            </div>
          </div>
        </div>
      </div>
      
      {/* wait until the data is fetched */}
      <div className={styles.albumSongs}>
        {albumInfo !== false && 
          <SongController 
            songArray={albumInfo.songs}
            type="artistSearch"
          />
        }
      </div>


    </div>
    

  )
}


function getAlbumDuration(songArray) {
  let time = 0; //time in seconds
  songArray.forEach(obj => {
    time += obj.duration;
  });

  return formattedTime(time);
}

function formattedTime(time) {
  let hours = Math.floor(time/3600);
  let minutes = Math.floor(time/60);
  let seconds = time % 60;

  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}


export default Album;