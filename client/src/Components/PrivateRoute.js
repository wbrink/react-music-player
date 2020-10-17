import React, { useState } from 'react';
import {Route, Redirect} from "react-router-dom";
import useIsAuthenticated from '../utils/useIsAuthenticated';

const PrivateRoute = ({children, ...rest}) => {
  // let loggedIn = null;
  let loggedIn = useIsAuthenticated();

  

  return (
    <Route {...rest} render={({location}) => loggedIn ? (children) : <Redirect to={{pathname: "/login", state: {from: location}}} />} />
  );
}
 
export default PrivateRoute;