import React from "react";
import {Route, Redirect} from "react-router-dom";
import useIsAuthenticated from '../utils/useIsAuthenticated';

// only 1 child is expected for this route
// if you are logged in you should not be able to visit this route
const RestrictedRoute = ( {children, location, ...rest}) => {
  let loggedIn = useIsAuthenticated();
  let from = location?.state?.from?.pathname;

  return (
    <Route {...rest} render={(routeProps) => loggedIn===false ? React.cloneElement(children, {...routeProps, from}) : (<Redirect to="/" />)} /> 
  )
}


export default RestrictedRoute;