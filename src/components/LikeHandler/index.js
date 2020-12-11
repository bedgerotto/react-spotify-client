import React, { useState, useEffect } from 'react';

import { getUserLikesTrack, putUserLikesTrack, deleteUserLikesTrack } from '../../api_resources/request'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import LikeButton from "../LikeButton";

import style from './index.module.scss'

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
    if (!event) {
      putUserLikesTrack(props.trackId).then((data) => {
        if(!data.error) {
          setLiked(true);
          setIsLoading(false);
        }
      }).catch((error) => {
        console.log(error);
        fetchFollowingStatus();
      });
    } else {
      handleUnlikeButtonClick()
    }
  }

  const handleUnlikeButtonClick = (event) => {
    deleteUserLikesTrack(props.trackId).then((data) => {
      if(!data.error) {
        setLiked(false)
        setIsLoading(false);
      }
    }).catch((error) => {
      fetchFollowingStatus();
    });;
  }

  return (
    <div className={style.likeHandler}>
      {
        isLoading ?
        <FontAwesomeIcon color="gray" icon={faCircleNotch} spin />
        :
        <>
          <LikeButton className={props.className} liked={liked} handleLikeButtonClick={handleLikeButtonClick} />
        </>
      }
    </div>
  )
}

export default LikeHandler;
