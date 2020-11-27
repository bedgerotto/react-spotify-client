import React,
  {
    useEffect,
    useState
  } from 'react';

import { Jumbotron } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import { getUserData, getUserTopListening } from '../api_resources/request';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = () => {
  const [userData, setUserData] = useState({topArtists: [], topTracks: []});

  useEffect(() => {
    getUserData().then((data) => {
      setUserData((u) => ({...u, ...data}));
    });
    getUserTopListening('artists').then((data) => {
      setUserData((u) => ({...u, ...{ topArtists: data.items }}))
    });
    getUserTopListening('tracks').then((data) => {
      setUserData((u) => ({...u, ...{ topTracks: data.items }}))
    });
  }, []);
  
  return (
    <div>
      <Jumbotron>
        <h1>Hello, {userData.display_name}!</h1>
        
      </Jumbotron>
      <div className='container'>
        {
          userData.topArtists.length === 0
          ?
          <Loading />
          :
          <div>
            <div>
              <h4>TOP 5 Artists</h4>
            </div>
            <table className="table table-bordered scroll">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Genres</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData.topArtists.map(data => {
                  return(
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.genres.join(', ')}</td>
                      <td>
                        <Link to={`/artist/${data.id}`}>
                          <FontAwesomeIcon icon={faShare} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <hr />
            <div>
              <h4>TOP 5 Tracks</h4>
            </div>
            <table className="table table-bordered scroll">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Album</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData.topTracks.map(data => {
                  return(
                    <tr key={data.id}>
                      <td>{data.name}</td>
                      <td>{data.album.name}</td>
                      <td>
                        <Link to={`/track/${data.id}`}>
                          <FontAwesomeIcon icon={faShare} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;
