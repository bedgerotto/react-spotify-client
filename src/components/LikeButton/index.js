import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-segments';

import animationData from './animation.json';
import style from './button.module.scss'

const LikeButton = (props) => {
  console.log(props.liked);
  const [isLiked, setLikeState] = useState(props.liked);
  const [animationState, setAnimationState] = useState({
    isStopped: false, isPaused: false,
    direction: props.liked ? -1 : 1,
    goToAndStop: {
      value: props.liked ? 116 : null,
      isFrame: true
    }
  });

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const reverseAnimation = -1;
  const normalAnimation = 1;

  const handler = (old) => {
    old(isLiked);
  
    setAnimationState({
      ...animationState,
      isStopped: false,

      direction: isLiked ? reverseAnimation : normalAnimation,
      goToAndStop: {
        value: null,
        isFrame: false
      }
    })
    setLikeState(!isLiked);
  }

  return (
    <div className={style.likeButton} onClick={() => handler(props.handleLikeButtonClick)}>
      <div className={style.animation}>
          <Lottie
            options={defaultOptions}
            width={200}
            height={200}
            direction={animationState.direction}
            isStopped={animationState.isStopped}
            isPaused={animationState.isPaused}
            goToAndStop={animationState.goToAndStop}/>
        </div>
      {/* <FontAwesomeIcon color="gray" icon={faHeart} /> */}
    </div>
  )
};

export default LikeButton;
