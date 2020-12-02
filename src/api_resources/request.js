import Cookies from 'universal-cookie';
import { generateRandomString } from './utils';

const baseUri = 'https://api.spotify.com/v1';
const baseRequestParams = () => {
  const headers = new Headers();
  const cookies = new Cookies();

  headers.append('Authorization', `Bearer ${cookies.get('access_token')}`)

  return { headers: headers, mode: 'cors' }
}

const loginApi = () => {
  var scope = 'user-top-read user-read-private user-read-email user-follow-modify user-follow-read user-library-read user-library-modify';
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URI);
  url += '&state=' + encodeURIComponent(generateRandomString(16));

  window.location = url;
}

const getUserData = async () => {
  const response = await fetch(`${baseUri}/me`, baseRequestParams())
  const body = await response.json();

  if (!response.ok) {
    return loginApi()
  }

  return body;
}

const getUserTopListening = async (type) => {
  const response = await fetch(`${baseUri}/me/top/${type}?limit=5`, baseRequestParams())
  const body = await response.json();

  return body;
}

const getArtist = async (id) => {
  const response = await fetch(`${baseUri}/artists/${id}`, baseRequestParams())
  const body = await response.json();

  return body;
}

const getTrack = async (id) => {
  const response = await fetch(`${baseUri}/tracks/${id}`, baseRequestParams())
  const body = await response.json();

  return body;
}

const getAlbum = async (id) => {
  const response = await fetch(`${baseUri}/albums/${id}`, baseRequestParams())
  const body = await response.json();

  return body;
}

const getArtistTopTracks = async (artistId) => {
  const response = await fetch(`${baseUri}/artists/${artistId}/top-tracks?market=PT`, baseRequestParams())
  const body = await response.json();

  return body;
}

const getArtistAlbums = async (artistId) => {
  const response = await fetch(`${baseUri}/artists/${artistId}/albums`, baseRequestParams())
  const body = await response.json();

  return body;
}

const getUserFollowArtists = async (artistIds = []) => {
  return handleUserFollowArtists('GET', artistIds);
}

const putUserFollowArtists = async (artistIds = []) => {
  return handleUserFollowArtists('PUT', artistIds);
}

const deleteUserFollowArtists = async (artistIds = []) => {
  return handleUserFollowArtists('DELETE', artistIds);
}

const handleUserFollowArtists = async (method, artistIds = []) => {
  const ids = artistIds.join();
  const params = baseRequestParams();
  const contains = method === 'GET' ? '/contains' : '';
  const response = await fetch(`${baseUri}/me/following${contains}?type=artist&ids=${ids}`, { ...params, ...{ method }});
  const body = await response.json();

  return body;
}

const getUserLikesTrack = (trackId) => {
  return handleUserLikesTrack('GET', trackId);
}

const putUserLikesTrack = (trackId) => {
  return handleUserLikesTrack('PUT', trackId);
}

const deleteUserLikesTrack = (trackId) => {
  return handleUserLikesTrack('DELETE', trackId);
}

const handleUserLikesTrack = async (method, trackId) => {
  const params = baseRequestParams();
  let ids, contains;
  if (Array.isArray(trackId)) {
    ids = trackId.join();
  } else {
    contains = method === 'GET' ? '/contains' : '';
    ids = trackId
  }

  const response = await fetch(`${baseUri}/me/tracks${contains}?ids=${ids}`, { ...params, ...{ method }});
  const body = await response.json();

  return body;
}

const getSearch = async (searchFilters) => {
  const searchParams = new URLSearchParams({q: searchFilters.q, limit: '10', offset: searchFilters.offset, type: ['artist', 'album', 'track'].join()})
  const response = await fetch(`${baseUri}/search?${searchParams}`, baseRequestParams())
  const body = await response.json();

  return body;
}

export {
  loginApi,
  getUserData,
  getUserTopListening,
  getArtist,
  getTrack,
  getSearch,
  getAlbum,
  getArtistTopTracks,
  getArtistAlbums,
  getUserFollowArtists,
  putUserFollowArtists,
  deleteUserFollowArtists,
  getUserLikesTrack,
  putUserLikesTrack,
  deleteUserLikesTrack
};
