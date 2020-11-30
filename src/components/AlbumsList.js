import React from 'react';

import { Link } from 'react-router-dom';

import { truncateString } from '../api_resources/utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

const AlbumsList = (props) => {
  return (
    <div>
      <div>
        <h4>{props.title}</h4>
      </div>
      <table className="table table-bordered scroll">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Release Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.albums.map(album => {
            return(
              <tr key={album.id}>
                <td>
                  {truncateString(album.name, 35)}
                </td>
                <td>{album.album_type}</td>
                <td>{album.release_date}</td>
                <td>
                <Link to={`/album/${album.id}`}>
                  <FontAwesomeIcon icon={faShare} />
                </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};

export default AlbumsList;
