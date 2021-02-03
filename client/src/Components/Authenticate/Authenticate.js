import React, {useState} from "react";
import styles from "./Authenticate.module.scss";
import {Link, useLocation} from "react-router-dom";
import image from "../Sidebar/music.svg"
import Login from "./Login";
import Signup from "./Signup";

const Authenticate = (props) => {
  const [feedback, setFeedback] = useState("");
  let location = props.location.pathname;

  

  // console.log("props", props);
  return (
    <div className="form-container">
      {/* logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={image} alt=""/>
        </div>
        <span className={styles.logoName}>Music</span>
      </div>

      {feedback ? 
        <div className="mainFeedback" style={{marginBottom: "15px"}}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          {feedback}
        </div> 
        : ""
      }
      
      {/* will be toggle login and signup */}
      <div className={styles.choice}>
        <Link to="/login" className={`${styles.link} ${location=="/login" ? styles.active : ""}`}>LOGIN</Link>
        <Link to="/signup" className={`${styles.link} ${location=="/signup" ? styles.active : ""}`}>SIGN UP</Link>
      </div>

     
      {location == "/login" ? <Login setFeedback={setFeedback}/> : <Signup setFeedback={setFeedback}/>}
    </div>
    
  )
}

export default Authenticate;