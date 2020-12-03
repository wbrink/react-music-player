import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import { useUser } from "../../utils/UserContext";

const Signup = (props) => {
  let history = useHistory();
  let [user, setUser] = useUser(); // user context

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState({
    emailFeedback: "",
    usernameFeedback: "",
    passwordFeedback: "",
    confirmPasswordFeedback: "",
    message: ""
  })

  // 
  const clearFeedback = () => {
    setFeedback({emailFeedback: "", usernameFeedback: "", passwordFeedback: "", confirmPasswordFeedback: "", message: ""})
  }

  // handle submit of registration form
  const handleSubmit = (e) => {
    clearFeedback();
    e.preventDefault(); // don't want form to submit

    const bool = validateForm();  // needs to be implemented
    if (bool) {
      // call the api to create user
      fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, email, password})
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data?.error === 'user already exists') {
          setFeedback({...feedback, message: "User already exists"});
        } else {
          console.log(data);
          setUser({
            user_id: data.user_id,
            username: data.username,
            email: data.email,
            joined: data.joined
          })
          console.log("registration sucessful");
          history.push("/");
        }
      })
      .catch(error => {
        throw error;
      })
    }
  }


  const validateForm = () => {
    return true;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <span className="feedback">{feedback.emailFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e=>setUsername(e.target.value)}/>
        <span className="feedback">{feedback.usernameFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <span className="feedback">{feedback.passwordFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
        <span className="feedback">{feedback.confirmPasswordFeedback}</span>
      </div>

      <div className="feedback">{feedback.message}</div>
      <input type="submit" id="formSubmitButton" value="Signup" />
    </form>
  )
}

export default Signup;