import React, { useState, useEffect } from 'react';

// components
// import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Sidebar from "./Components/Sidebar/Sidebar";
// import Library from "./Components/Library/Library";
import Authenticate from "./Components/Authenticate/Authenticate";
// import Explore from "./Components/Explore/Explore";
import Search from "./Components/Search/Search";
import Artist from "./Components/Artist/Artist";
import Library from "./Components/Library/Library";

// songProvider
// import {LibraryProvider} from "./Contexts/LibraryContext";
// import {SongProvider} from "./Contexts/SongContext";
import {PlaylistProvider} from "./utils/LibraryContext";


// song data
import data from "./songs.json";


import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Playlists from "./Components/Playlists/Playlists";
import { AuthProvider } from './utils/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import RestrictedRoute from "./Components/RestrictedRoute";
import { UserProvider } from './utils/UserContext';
import { SearchProvider } from "./utils/SeachContext";
import Album from './Components/Album/Album';
import { LibraryProvider } from './utils/LibraryContext';


function App() {


  // add padding to the container to avoid margin collapsing
  return (
    <LibraryProvider>
    <UserProvider>
    <SearchProvider>
      <Router>
        <div className="grid">
          <div className="sidebar"><Sidebar /></div>
          
          {/* add account tab to sidebar to allow for logout and deletion of account */}
          <div className="mainContent">
            <Switch>
              
              <RestrictedRoute path="/login" key="1">
                <Authenticate />
              </RestrictedRoute>

              <RestrictedRoute path="/signup" key="2">
                <Authenticate />
              </RestrictedRoute>

              

              <PrivateRoute path="/artist/:name/:id" key="3">
                <Artist />
              </PrivateRoute>

              <PrivateRoute path="/search" key="4">
                <Search />
              </PrivateRoute>

              <PrivateRoute path="/album/:id" key="5">
                <Album />
              </PrivateRoute>

              <PrivateRoute path="/playlists" key="6">
                <Playlists />
              </PrivateRoute>

              <PrivateRoute path="/library" key="9">
                <Library />
              </PrivateRoute>

              <PrivateRoute path="/explore" key="7">
                <Playlists />
              </PrivateRoute>

              <PrivateRoute path="/" key="8">
                <Playlists />
              </PrivateRoute>

              
      
            </Switch>
          </div>
          
          {/* <div className="footer"><MusicPlayer /></div> */}
          
        </div>
      </Router>
    </SearchProvider>
    </UserProvider>
    </LibraryProvider>
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