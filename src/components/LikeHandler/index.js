import React, { useState, useEffect } from 'react';

import { getUserLikesTrack, putUserLikesTrack, deleteUserLikesTrack } from '../../api_resources/request'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import LikeButton from "../LikeButton";
import UnlikeButton from "../UnlikeButton";

const LikeHandler = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getUserLikesTrack(props.trackId).then((data) => {
      if (!data.error) {
        if (!data.error && Array.isArray(data) && data[0]) {
          setLiked((f) => f = true)
        } else {
          setLiked((f) => f = false)
        }
      }
      setIsLoading((l) => l = false)
    }).catch((error) => {
      console.log(error);
    });
  }, [props.trackId]);

  const fetchFollowingStatus = () => {
    getUserLikesTrack(props.trackId).then((data) =>{
      if (!data.error && Array.isArray(data) && data[0]) {
        setLiked((f) => f = true)
      } else {
        setLiked((f) => f = false)
      }
      setIsLoading(false);
    })
  }

  const handleLikeButtonClick = (event) => {
    setIsLoading(true);
    putUserLikesTrack(props.trackId).then((data) => {
      if(!data.error) {
        setLiked(true);
        setIsLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      fetchFollowingStatus();
    });
  }

  const handleUnlikeButtonClick = (event) => {
    setIsLoading(true);
    deleteUserLikesTrack(props.trackId).then((data) => {
      if(!data.error) {
        setLiked(false)
        setIsLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      fetchFollowingStatus();
    });;
  }

  const style = {
    'font-size': '32px',
    'cursor': 'pointer'
  }

  return (
    <div style={style} className="float-right mt-1 mr-3">
      {
        isLoading ?
        <FontAwesomeIcon color="gray" icon={faCircleNotch} spin />
        :
        <>
          {
            liked ?
            <UnlikeButton className={props.className} handleUnlikeButtonClick={handleUnlikeButtonClick} />
            :
            <LikeButton  className={props.className} handleLikeButtonClick={handleLikeButtonClick} />
          }
        </>
      }
    </div>
  )
}

export default LikeHandler;
