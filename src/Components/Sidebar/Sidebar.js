import React, { useState, useEffect } from 'react';
import styles from "./Sidebar.module.scss";
import image from "./music.svg";

const Sidebar = (props) => {

  const [search, setSearch] = useState("");

  

  return (
    <div className={styles.sidebar}>

      {/* logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={image} alt=""/>
        </div>
        <span className={styles.logoName}>Music</span>
      </div>
      

      {/* search portion */}
      <div className={styles.search}>
        <svg viewBox="0 0 16 16" className={styles.searchIcon} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
        <input type="text" id="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} maxLength={40}/>

        {/* close icon when text appears*/}
        {search && <svg onClick={e => setSearch("")} width="1em" height="1em" viewBox="0 0 16 16" className={styles.clearTextButton} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
        </svg>}
        
      </div>
      

      {/* favorties tab to list favorites */}
      <div className={styles.favorites}>Liked Songsasdfasd</div>

    </div>
  );
}
 
export default Sidebar;