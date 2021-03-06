import React, { useState, useEffect, useRef } from 'react';
import styles from "./Sidebar.module.scss";
import image from "./music.svg";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import { useSearchResults } from '../../utils/SeachContext';

const Sidebar = (props) => {
  const [searchResults, setSearchResults] = useSearchResults();
  const [search, setSearch] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  let location = useLocation();
  const [showDialog, setShowDialog] = useState(false); 
  const [showMenu, setShowMenu] = useState(false); // for the mobile nav
  const [opacity, setOpacity] = useState(0);

  let inputRef = useRef();
  let history = useHistory();

  // hamburger
  const handleHamburgerClick = () => {
    if (showMenu == false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  // event that opens the create playlist form
  const addPlaylist = (e) => {
    e.preventDefault();
    setShowDialog((prev) => {
      if (prev) {
        return false;
      } else {
        return true;
      }
    })
  }

  // runs once on mount and when search state updates
  useEffect(() => {
    const abortCtrl = new AbortController();

    if (search == "") {
      // redirect back to library
      setSearchResults(false);
      history.push("/library");
      return;
    }
    
    
    const timer = setTimeout(() => {
      if (search === inputRef.current.value) {
        fetch("/api/tracks/search", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          signal: abortCtrl.signal,
          body: JSON.stringify({search: search})
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // if no results
          if (data[0].length === 0 && data[1].length === 0 && data[2].length === 0) {
            setSearchResults("no results found");
          } else {
            setSearchResults({
              tracks: data[0],
              artists: data[1],
              albums: data[2]
            })
          }

          
        })
        .catch((error) => {
          if (error.name == "AbortError") {
            console.log("aborted fetch");
          } else {
            throw error;
          }
        })
      }

    }, 700)

    return () => {
      abortCtrl.abort();
      clearTimeout(timer);
    }
  }, [search])


  // this will change the route give the results
  const handleSearch = (e) => {
    setSearch(e.target.value);
    history.push("/search");
  }

  // this will create the playlist
  const createPlaylist = () => {
    // check to make sure the playlist doesn't already exists
    if (playlistName.length == 0) {
      return;
    }
    props.setState(prev => {
      const playlists = prev.playlists;
      playlists.push({playlistName : {dateCreated: Date.now()}})
      return {...prev, playlists}
    })
    setShowDialog(false);
  }

  // if we are in login don't show the navbar 
  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null
  }


  return (
    <div className={styles.mainContainer}>
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
            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          </svg>
          <input type="text" id="search" placeholder="Search" value={search} onChange={handleSearch} maxLength={40} ref={inputRef}/>

          {/* close icon when text appears*/}
          {search && <svg onClick={e => setSearch("")} width="1em" height="1em" viewBox="0 0 16 16" className={styles.clearTextButton} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>}
        </div>
        

        {/* favorties tab to list favorites */}
        <div className={styles.links}>
          <NavLink to="/library" activeClassName={styles.active}>Library</NavLink>
          <NavLink to="/explore" activeClassName={styles.active}>Explore</NavLink>
          {/* <NavLink to="/favorites" activeClassName={styles.active}>Favorites</NavLink> */}
          <NavLink to="/playlists" activeClassName={styles.active}>
            <div className={styles.playlistContainer}>
              <span>Playlist</span>
              
              {!showDialog && 
                <svg onClick={addPlaylist} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              }

              {showDialog && 
                <svg width="1em" onClick={addPlaylist} height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              }
            </div> 

            {/* add playlist form */}
            <div className={showDialog ? `${styles.playlistForm} ${styles.open}` : `${styles.playlistForm}`}>
              <label htmlFor="playlistName">Create New Playlist</label>
              <input type="text" name="" id="" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName} />
              <input type="submit" value="Add" onClick={createPlaylist} />      
            </div>
            

          </NavLink>
        </div>

      </div>

      <div className={styles.mobileNav}>
        {/* logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src={image} alt=""/>
          </div>
          <span className={styles.logoName}>Music</span>
        </div>

        <div className={styles.hamburger} onClick={handleHamburgerClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>

        <div className={styles.menu} style={showMenu ? {opacity: "1", left: "0"} : {opacity: "0", left: "-100%"}}>
          <div className={styles.search}>
            <svg viewBox="0 0 16 16" className={styles.searchIcon} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
              <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
            <input type="text" id="search" placeholder="Search" value={search} onChange={handleSearch} maxLength={40} ref={inputRef}/>

            {/* close icon when text appears*/}
            {search && <svg onClick={e => setSearch("")} width="1em" height="1em" viewBox="0 0 16 16" className={styles.clearTextButton} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>}
          </div>

          <div className={styles.links}>
            <NavLink to="/library" activeClassName={styles.active}>Library</NavLink>
            <NavLink to="/explore" activeClassName={styles.active}>Explore</NavLink>
            {/* <NavLink to="/favorites" activeClassName={styles.active}>Favorites</NavLink> */}
            <NavLink to="/playlists" activeClassName={styles.active}>
              <div className={styles.playlistContainer}>
                <span>Playlist</span>
                
                {!showDialog && 
                  <svg onClick={addPlaylist} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                }

                {showDialog && 
                  <svg width="1em" onClick={addPlaylist} height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                }
              </div> 

              {/* add playlist form */}
              <div className={showDialog ? `${styles.playlistForm} ${styles.open}` : `${styles.playlistForm}`}>
                <label htmlFor="playlistName">Create New Playlist</label>
                <input type="text" name="" id="" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName} />
                <input type="submit" value="Add" onClick={createPlaylist} />      
              </div>
              

            </NavLink>
          </div>
        </div>

      </div>

    </div>
  );
}
 
export default Sidebar;