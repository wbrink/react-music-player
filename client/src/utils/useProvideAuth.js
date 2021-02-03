import React, {useState, useEffect} from "react";


const useProvideAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   isAuthenticated();

  //   return () => {
  //     console.log("unmounting the provide auth react thingy");
  //   }
  // }, [])

  const signOut = () => {
    setAuthenticated(false);
  }

  const signIn = () => {
    setAuthenticated(true);
  }

  const isAuthenticated = () => {
    fetch("/api/isAuthenticated")
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("data from provide auth", data);
        if (data.authenticated == true) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false);
        }
        return;
      })
      .catch(error => {
        console.log("caught an error", error);
        setAuthenticated(false);

        if (error.name === "AbortError") {
          console.log("request was cancelled");
        }
        return;
      })
      .then(() => setIsLoading(false))
  }





  return {
    isLoading,
    authenticated,
    isAuthenticated,
    signIn,
    signOut
  }
}

export default useProvideAuth;