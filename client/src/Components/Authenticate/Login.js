import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { useUser } from "../../utils/UserContext";

const Login = (props) => {
  const [user,setUser] = useUser(); // user context 

  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFeedback, setUsernameFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

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
        history.push("/");
      }
    })
  }

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