import React, { Component } from 'react';
import styles from "./Library.module.scss";
import SongItem from "../SongItem/SongItem";

const Library = (props) => {
  return (
    <div className={styles.container}>
      <SongItem artist="Fuel" song="Shimmer" album="Sunburn"/>
      <SongItem artist="Deadmau5" song="Faxing Berlin" album="Random Album Title"/>
      <SongItem artist="De Lorra" song="Still Phasing" album="Sunburn" active={true}/>
      <SongItem artist="Take Off!" song="A.L.I.S.O.N" album="Stargazing"/>
      <SongItem artist="A.L.I.S.O.N" song="Take Offdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf!" album="Stargazing"/>

    </div>
  );
}
 
export default Library;