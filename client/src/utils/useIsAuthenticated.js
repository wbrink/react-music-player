import React, {useState, useEffect, useContext} from "react";
import { useLogin } from "./LoginContext";

function useIsAuthenticated() {
  const [loggedIn, setLoggedIn] = useLogin(); // by default is false

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = {signal: abortCtrl.signal};

    fetch("/api/isAuthenticated")
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        setLoggedIn(data.authenticated);
      })
      .catch(error => {
        console.log("caught an error", error);
        setLoggedIn(false);

        if (error.name === "AbortError") {
          console.log("request was cancelled");
        }
      })

    // runs when the component unmounts
    return () => abortCtrl.abort(); 
  }, []);

  return loggedIn;
}

export default useIsAuthenticated;