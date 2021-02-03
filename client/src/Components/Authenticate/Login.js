import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { usePlaylist } from "../../utils/PlaylistContext";
import useProvideAuth from "../../utils/useProvideAuth";
import { useUser } from "../../utils/UserContext";

const Login = (props) => {
  const [user,setUser] = useUser(); // user context 
  const [playlist, setPlaylist] = usePlaylist();

  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFeedback, setUsernameFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);


  // runs when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault(); // don't want form to submit

    fetch("/api/user/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
    .then(data => {
      if (data?.authenticated === false) {
        props.setFeedback("Invalid Login")
        // clear the inputs
        setUsername("");
        setPassword("");
      } else {
        setUser({
          user_id: data.user_id,
          username: data.username,
          email: data.email,
          joined: data.joined
        })
        console.log("login successful");
        setLoggedIn(true);
        // fetch the library
      }
    })
  }

  // runs when component mounts and when logged gets changed 
  useEffect(() => {
    if (loggedIn === false) {
      return;
    }
    const abortCtrl = new AbortController();
    const opts = {signal: abortCtrl.signal}
    fetch("/api/user/library", opts) 
      .then(res => res.json()) 
      .then(data => {
        console.log("library", data);
        setPlaylist(data); // set the library to the loaded data
        history.push("/");
      })
      .catch(error => {
        console.error(error);
      })

    return () => {
      abortCtrl.abort();
    }
  }, [loggedIn])


  // jsx
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Email or Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} maxLength="50"/>
        <span className="feedback">{usernameFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} maxLength="25"/>
        <span className="feedback">{passwordFeedback}</span>
      </div>

      <input type="submit" id="formSubmitButton" value="Login"/>
    </form>
  )
} 

export default Login;