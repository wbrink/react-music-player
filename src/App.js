import React from 'react';
import './App.scss';

// components
import Navbar from "./Components/Navbar/Navbar";
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';

function App() {
  console.log("rendering the app")
  return (
    <div>
      <Navbar />
      <h1>Hello World</h1>

      <ul className="list">
        <li>About</li>
        <li>Hello</li>
      </ul>


      <MusicPlayer />
    </div>
  );
}

export default App;
