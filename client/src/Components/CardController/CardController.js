import React from "react";
import styles from "./CardController.module.scss";
import {useHistory} from "react-router-dom";


const CardController = (props) => {
  const {albumArray} = props
  let history = useHistory();

  const handleAlbumClick = (album_id) => {
    history.push("/album/"+ album_id);
  }
  console.log("albumarray", albumArray);

  return (
    <div className={styles.section}>
      {albumArray.map((obj, index) => {
        return (
          <div className={styles.card} onClick={() => handleAlbumClick(obj.album_id)}>
            <img className={styles.albumCover} src={obj.album_art_path} alt="album art"/>
            <p className={styles.primaryText}>{obj.album_name}</p>
            <p className={styles.secondaryText}>{obj.release_date.substring(0,4)}</p>
          </div>
        )
        
      })}
    </div>
  )
} 


export default CardController;