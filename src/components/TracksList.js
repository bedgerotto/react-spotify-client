import React from 'react';

import { Link } from 'react-router-dom';

import PreviewTrack from './PreviewTrack';
import { truncateString } from '../api_resources/utils'

const TracksList = (props) => {
  return (
    <div>
      <div>
        <h4>{props.title}</h4>
      </div>
      <table className="table table-bordered scroll">
        <thead>
          <tr>
            <th>Track Number</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.tracks.map(track => {
            return(
              <tr key={track.id}>
                <td>
                  <Link to={`/track/${track.id}`}>
                    #{track.track_number}
                  </Link>
                </td>
                <td>
                  {truncateString(track.name, 20)}
                </td>
                <td>
                  <PreviewTrack size="200px" previewUrl={track.preview_url} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};

export default TracksList;
