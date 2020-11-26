import Cookies from 'universal-cookie';
import { generateRandomString } from './utils';

const loginApi = () => {
  var scope = 'user-read-private user-read-email';
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URI);
  url += '&state=' + encodeURIComponent(generateRandomString(16));

  window.location = url;
}

const getUserData = async () => {
  const headers = new Headers();
  const cookies = new Cookies();

  headers.append('Authorization', `Bearer ${cookies.get('access_token')}`)
  const requestParams = {
    headers: headers,
    mode: 'cors'
  }
  const response = await fetch('https://api.spotify.com/v1/me', requestParams)
  const body = await response.json();

  return body;
}

export { loginApi, getUserData };
