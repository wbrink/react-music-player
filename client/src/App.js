import React, { useState, useEffect } from 'react';
import './App.scss';

// components
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Sidebar from "./Components/Sidebar/Sidebar";
import Library from "./Components/Library/Library";
import Explore from "./Components/Explore/Explore";

// songProvider
import {LibraryProvider} from "./Contexts/LibraryContext";
import {SongProvider} from "./Contexts/SongContext";

// song data
import data from "./songs.json";


import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Playlists from './Components/Playlists/Playlists';


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

  return (

    <Router>

      {/* <LibraryProvider>   */}
        {/* <SongProvider> */}
          <div style={{height: "100%", backgroundColor: "red", width: "100%"}}>
            {/* <Navbar /> */}
            <Sidebar state={state} setState={setState}/>

            <Switch>
              <Route path="/library"><Library key={state} state={state} setState={setState} /></Route>
              <Route path="/explore"><Explore /></Route>

              <Route path="/playlists"><Playlists key={state} state={state} setState={setState}/></Route>
            </Switch>

            <MusicPlayer key={state} state={state} setState={setState}/>
          
          </div>
        {/* </SongProvider> */}
      {/* </LibraryProvider> */}
    </Router>
    
  );
}

export default App;
