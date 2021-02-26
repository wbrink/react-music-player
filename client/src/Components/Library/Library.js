import React, {useEffect} from 'react';
import { useLibrary } from '../../utils/LibraryContext';
import SongController from "../SongItem/SongController";
import styles from "./Library.module.scss";


export default function Library(props) {
  const {library, setLibrary} = useLibrary();

  useEffect(() => {
    console.log("song has been changed from the library");
    console.log(library);
    console.log(props);
  }, [library])

  return (
    <>
      <div className={styles.header}>
        <h1>Library</h1>
      </div>
      <SongController 
        type="search"
        songArray={library}
      />
    </>  
  )
}
