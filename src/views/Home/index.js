import React,
  {
    useEffect,
    useState
  } from 'react';

import { Jumbotron, Row, Col } from 'react-bootstrap'

import { getUserData, getUserTopListening } from '../../api_resources/request';

import TopArtists from '../../components/TopArtists';
import TopTracks from '../../components/TopTracks';
import Error from '../../components/Error';
import Hr from '../../components/structure/hr';

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
    <>
      {
        userData.id ?
        <>
          <Jumbotron>
            <h1>Hello, {userData.display_name}!</h1>
          </Jumbotron>
          <Row>
            <Col>
              <TopArtists isLoading={topArtistsLoading} topArtists={userData.topArtists} />
              <Hr />
              <TopTracks isLoading={topTracksLoading} topTracks={userData.topTracks} />
            </Col>
          </Row>
        </>
        :
        <Error />
      }
      
    </>
  )
}

export default Home;
