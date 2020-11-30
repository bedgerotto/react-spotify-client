import React,
  {
    useEffect,
    useState
  } from 'react';

import { Jumbotron } from 'react-bootstrap'


import { getUserData, getUserTopListening } from '../api_resources/request';

import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import Error from '../components/Error';

const Home = () => {
  const [userData, setUserData] = useState({topArtists: [], topTracks: []});
  const [topArtistsLoading, setTopArtistsLoading] = useState(true);
  const [topTracksLoading, setTopTracksLoading] = useState(true);

  useEffect(() => {
    getUserData().then((data) => {
      setUserData((u) => ({...u, ...data}));
    });
    getUserTopListening('artists').then((data) => {
      setUserData((u) => ({...u, ...{ topArtists: data.items }}))
      setTopArtistsLoading((t) => (t = false))
    });
    getUserTopListening('tracks').then((data) => {
      setUserData((u) => ({...u, ...{ topTracks: data.items }}))
      setTopTracksLoading((t) => (t = false))
    });
  }, []);
  
  return (
    <div>
      {
        userData.id ?
        <div>
          <Jumbotron>
            <h1>Hello, {userData.display_name}!</h1>
          </Jumbotron>
          <div className='container'>
            <TopArtists isLoading={topArtistsLoading} topArtists={userData.topArtists} />
              <hr />
            <TopTracks isLoading={topTracksLoading} topTracks={userData.topTracks} />
          </div>
        </div>
        :
        <Error />
      }
      
    </div>
  )
}

export default Home;
