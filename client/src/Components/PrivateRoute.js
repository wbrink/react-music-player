import React, { useEffect, useState } from 'react';
import {Route, Redirect} from "react-router-dom";
import {usePlaylist} from "../utils/PlaylistContext";
import {useLibrary} from "../utils/LibraryContext";
import {useAuth} from "../utils/AuthContext";
import useProvideAuth from '../utils/useProvideAuth';
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({children, ...rest}) => {
  const auth = useProvideAuth();

  useEffect(() => {
    auth.isAuthenticated();
    return () => {
      console.log("unmounting");
    }
  },[])
  
  return (
    <Route {...rest} render={({location}) => (
      !auth.isLoading 
        ? 
        (
          auth.authenticated
            ?
            (children)
            : 
            <Redirect to={{pathname: "/login", state: {from: location}}} />
        )
        :
        <Loading />
    )} />
  );
}
 
export default PrivateRoute;