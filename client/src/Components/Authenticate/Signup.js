import React, {useState} from "react";

const Signup = (props) => {
  const [email, setEmail] = useState("b@email.com");
  const [emailFeedback, setEmailFeedback] = useState("Must be valid email");
  const [username, setUsername] = useState("billy");
  const [usernameFeedback, setUsernameFeedback] = useState("That's a weird username");
  const [password, setPassword] = useState("abc");
  const [passwordFeedback, setPasswordFeedback] = useState("Password Must be Longer than 6 Characters");
  const [confirmPassword, setConfirmPassword] = useState("abb");
  const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("Password must match");

  console.log(props);

  const handleSubmit = (e) => {
    e.preventDefault(); // don't want form to submit
    console.log("form submitted");

    const bool = validateForm();

    if (bool) {
      
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
        <span className="feedback">{emailFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e=>setUsername(e.target.value)}/>
        <span className="feedback">{usernameFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <span className="feedback">{passwordFeedback}</span>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
        <span className="feedback">{confirmPasswordFeedback}</span>
      </div>

      <input type="submit" id="formSubmitButton" value="Signup" />
    </form>
  )
}

export default Signup;