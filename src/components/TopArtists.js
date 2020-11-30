import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import Loading from './Loading';

const TopArtists = (props) => {
  return (
      <div>
        { props.isLoading ? <Loading /> :
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
                {props.topArtists.map(data => {
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
          </div>
        }
    </div>
  )
};

export default TopArtists;
