import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";

import { urlHashToObject } from "../api_resources/utils";

const Callback = () => {
  const cookies = new Cookies();
  const location = useLocation();
  const params = urlHashToObject(location.hash);

  let expires = new Date();
  let cookieExpiration = new Date(expires.setSeconds(expires.getSeconds() + params.expires_in));
  cookies.set('access_token', params.access_token, {expires: cookieExpiration});

  return (
    !!cookies.get('access_token') ? <Redirect to="/home" /> : <Redirect to="/login" />
  )
}

export default Callback;
