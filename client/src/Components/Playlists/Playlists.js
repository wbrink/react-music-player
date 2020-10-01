import React from 'react';
import styles from "./Playlists.module.scss"

const Playlists = (props) => {
  console.log(props.state.playlists)

  return (
    <div className={styles.container}>
      <h2>Hello Playlsits</h2>
    </div>
  );
}
 
export default Playlists;