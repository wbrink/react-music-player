import React from "react";
import styles from "./Search.module.scss";

const Search = (props) => {
  return (
    <div className ={styles.container}>
      <div className={styles.songs}>
        <h1>Songs</h1>
        <ul>
          {/* map the songs  */}
        </ul>
      </div>

      <div className={styles.artists}>
        <h1>Artists</h1>
        {/* map over the artist and give circular pic and text underneath */}
      </div>

      <div className={styles.albums}>
        <h1>Albums</h1>
        {/* map over the albums */}
      </div>
    </div>
    
  )
}

export default Search;