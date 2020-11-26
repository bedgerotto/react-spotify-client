import React from 'react';
import { generateRandomString } from '../api_resources/generateRandomString';

const Login = () => {
  const loginApi = () => {
    var scope = 'user-read-private user-read-email';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + process.env.SPOTIFY_CLIENT_ID;
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);
    url += '&state=' + encodeURIComponent(generateRandomString(16));

    window.location = url;
  }

  return (
    <div>
      <button onClick={loginApi}>Login with Spotify</button>
    </div>
  )
}

export default Login;
