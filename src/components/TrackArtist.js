import React, { useState, useEffect } from 'react';

import { getUserFollowArtists, putUserFollowArtists, deleteUserFollowArtists } from '../api_resources/request';
import Loading from './Loading';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton'

const TrackArtist = (props) => {
  const [following, setFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getUserFollowArtists([props.artistId]).then((data) =>{
      if (!data.error && Array.isArray(data) && data[0]) {
        setFollowing((f) => f = true)
      } else {
        setFollowing((f) => f = false)
      }
      setIsLoading(false);
    })
  }, [props.artistId]);

  const fetchFollowingStatus = () => {
    getUserFollowArtists([props.artistId]).then((data) =>{
      if (!data.error && Array.isArray(data) && data[0]) {
        setFollowing((f) => f = true)
      } else {
        setFollowing((f) => f = false)
      }
      setIsLoading(false);
    })
  }

  const handleFollowButtonClick = (event) => {
    setIsLoading(true);
    putUserFollowArtists([props.artistId]).then((data) => {
      if(!data.error) {
        setFollowing(true);
        setIsLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      fetchFollowingStatus();
    });
  }

  const handleUnfollowButtonClick = (event) => {
    setIsLoading(true);
    deleteUserFollowArtists([props.artistId]).then((data) => {
      if(!data.error) {
        setFollowing(false)
        setIsLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      fetchFollowingStatus();
    });;
  }

  return (
    <div className="float-right mt-1 col-sm-2">
      {
        isLoading ?
        <button className={`btn btn-secondary col-sm-12 ${props.className}`}>
          <Loading />
        </button>
        :
        <div>
          {
            following ?
            <UnfollowButton className={props.className} handleUnfollowButtonClick={handleUnfollowButtonClick} />
            :
            <FollowButton  className={props.className} handleFollowButtonClick={handleFollowButtonClick} />
          }
        </div>
      }
    </div>
  )
}

export default TrackArtist;
