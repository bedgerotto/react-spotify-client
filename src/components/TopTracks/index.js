import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

import { Table } from 'react-bootstrap'

import Loading from '../Loading';

const TopTracks = (props) => {
  return (
      <div>
        { props.isLoading ? <Loading /> :
          <div>
            <div>
              <h4>TOP 5 Tracks</h4>
            </div>
            <Table variant="dark" striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Album</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.topTracks.map(data => {
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
            </Table>
          </div>
        }
    </div>
  )
};

export default TopTracks;
