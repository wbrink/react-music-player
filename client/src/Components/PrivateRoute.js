import React, { useEffect, useState } from 'react';
import {Route, Redirect} from "react-router-dom";
import useProvideAuth from '../utils/useProvideAuth';
import Loading from "../Components/Loading/Loading";
import { useLibrary } from '../utils/LibraryContext';

const PrivateRoute = ({children, ...rest}) => {
  const auth = useProvideAuth();
  const library = useLibrary();

  useEffect(() => {
    auth.isAuthenticated();
    // if the library is not loaded then you need to load it into the context provider
    if (library.loaded === false) {
      library.loadLibrary();
    }

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