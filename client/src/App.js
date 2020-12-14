import React, { useState, useEffect } from 'react';

// components
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Sidebar from "./Components/Sidebar/Sidebar";
// import Library from "./Components/Library/Library";
import Authenticate from "./Components/Authenticate/Authenticate";
// import Explore from "./Components/Explore/Explore";
import Search from "./Components/Search/Search";
import Artist from "./Components/Artist/Artist";

// songProvider
import {LibraryProvider} from "./Contexts/LibraryContext";
import {SongProvider} from "./Contexts/SongContext";

// song data
import data from "./songs.json";


import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Playlists from './Components/Playlists/Playlists';
import { LoginProvider } from './utils/LoginContext';
import PrivateRoute from './Components/PrivateRoute';
import RestrictedRoute from "./Components/RestrictedRoute";
import { UserProvider } from './utils/UserContext';
import { SearchProvider } from "./utils/SeachContext";
import Album from './Components/Album/Album';


function App() {
  // this will be a Map for the playlists
  // let playlists = new Map();
  
  const [state, setState] = useState({
    library: [],
    altPlaylist: [], // this is to load the songs in the currently active playlist
    playlists: [], // this is to show all the playlists and their songs
    onLibrary: true,
    index: 0,
    play: false
  })


  // get the users library of songs
  useEffect(() => {
    setState((prevState) => {
      return {...prevState, library: data}
    })
  }, [])

  //library playlist
  // whatever playlist we are exploring
  // the playlist switches when we click on i.e 90s alternative 
  // and likewise it stays on 90s alt until we click a song that is on a another playlist
  

  // add padding to the container to avoid margin collapsing
  return (
    <UserProvider>
    <SearchProvider>
    <LoginProvider>
    <Router>
      <div className="grid">
        <div className="sidebar"><Sidebar state={state} setState={setState}/></div>
        
        {/* add account tab to sidebar to allow for logout and deletion of account */}
        <div className="mainContent">
          <Switch>
            
            <RestrictedRoute path="/login">
              <Authenticate />
            </RestrictedRoute>

            <RestrictedRoute path="/signup">
              <Authenticate />
            </RestrictedRoute>

            

            <PrivateRoute path="/artist/:name/:id">
              <Artist />
            </PrivateRoute>

            <PrivateRoute path="/search">
              <Search />
            </PrivateRoute>

            <PrivateRoute path="/album/:id">
              <Album />
            </PrivateRoute>

            <PrivateRoute path="/">
              {() => ""}
            </PrivateRoute>
    
          </Switch>
        </div>
        
        <div className="footer"><MusicPlayer key={state} state={state} setState={setState}/></div>
        
      </div>
    </Router>
    </LoginProvider>
    </SearchProvider>
    </UserProvider>
  );
}

export default App;



            // {/* <PrivateRoute path="/explore">
            //   <Explore />
            // </PrivateRoute> */}



            // {/* <PrivateRoute path="/library">
            //   <Library key={state} state={state} setState={setState} />
            // </PrivateRoute> */}
            
            // {/* <PrivateRoute path="/playlists">
            //   <Playlists key={state} state={state} setState={setState}/>
            // // </PrivateRoute> 