import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from "universal-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const cookies = new Cookies();

  return (
    <Route
      {...rest}
      render={props => (
        !!cookies.get('access_token') ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      )}
    />
  )
}

export default ProtectedRoute;
