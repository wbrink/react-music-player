import React, {useState} from "react";
import styles from "./Authenticate.module.scss";
import {Link, useLocation} from "react-router-dom";
import image from "../Sidebar/music.svg"
import Login from "./Login";
import Signup from "./Signup";

const Authenticate = (props) => {
  const [confirmPassword, setConfirmPassword] = useState("a");
  const [feedback, setFeedback] = useState("Please Enter valid Email Address");
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
      
      {/* will be toggle login and signup */}
      <div className={styles.choice}>
        <Link to="/login" className={`${styles.link} ${location=="/login" ? styles.active : ""}`}>LOGIN</Link>
        <Link to="/signup" className={`${styles.link} ${location=="/signup" ? styles.active : ""}`}>SIGN UP</Link>
      </div>

      <form action="">
        {location == "/login" ? <Login /> : <Signup />}
      </form>
    </div>
    
  )
}

export default Authenticate;