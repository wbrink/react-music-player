import React from 'react';
import './App.scss';

// components
import Navbar from "./Components/Navbar/Navbar";
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Sidebar from "./Components/Sidebar/Sidebar";
import Library from "./Components/Library/Library";
import Explore from "./Components/Explore/Explore";

// songProvider
import {LibraryProvider} from "./Contexts/LibraryContext";
import {SongProvider} from "./Contexts/SongContext";


import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function App() {

  return (

    <Router>

      <LibraryProvider>  
        <SongProvider>
          <div style={{height: "100%", backgroundColor: "red", width: "100%"}}>
            {/* <Navbar /> */}
            <Sidebar />

            <Switch>
              <Route path="/library" component={Library} />
              <Route path="/explore" component={Explore} />
            </Switch>

            <MusicPlayer />
          
          </div>
        </SongProvider>
      </LibraryProvider>
    </Router>
    
  );
}

export default App;
