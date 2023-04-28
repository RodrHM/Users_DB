import React from 'react';
import { Navigate } from 'react-router-dom';


function PrivateRoute ({ component, isAuthenticated, redirect }){

  return (
    <>
      {
        isAuthenticated
          ? <>{component}</>
          : <Navigate to={redirect}/>
      }
    </>
  );
}

  export default PrivateRoute;