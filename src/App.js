import React from 'react';
import './App.scss';

// components
import Navbar from "./Components/Navbar/Navbar";
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Sidebar from "./Components/Sidebar/Sidebar";
import Library from "./Components/Library/Library";

function App() {
  console.log("rendering the app")
  return (
    <div style={{height: "100%", backgroundColor: "red", width: "100%"}}>
      {/* <Navbar /> */}
      <Sidebar />
      <Library />
      <MusicPlayer />
      
    </div>
  );
}

export default App;
