import React, {useState} from "react"

const Login = () => {
  const [username, setUsername] = useState("aaaa");
  const [password, setPassword] = useState("aa");
  const [usernameFeedback, setUsernameFeedback] = useState("Please Enter valid Email Address");
  const [passwordFeedback, setPasswordFeedback] = useState("Must be 6 characters or longer");

  return (
    <div>
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
    </div>
  )
    
    

} 

export default Login;