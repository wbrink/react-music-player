import React, {useState, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import useProvideAuth from "../utils/useProvideAuth";
import Loading from "../Components/Loading/Loading";


// only 1 child is expected for this route
// if you are logged in you should not be able to visit this route
const RestrictedRoute = ( {children, location, ...rest}) => {
  let from = location?.state?.from?.pathname;
  const auth = useProvideAuth();  

  useEffect(() => {
    auth.isAuthenticated();
    return () => {
      console.log("unmounting");
    }
  },[])

  return (
    <Route {...rest} render={(routeProps) => (
      !auth.isLoading 
        ? 
        (
          auth.authenticated == false
            ?
            React.cloneElement(children, {...routeProps, from}) 
            : 
            <Redirect to="/" />
        )
        :
        <Loading />
    )} />
  )
}


export default RestrictedRoute;