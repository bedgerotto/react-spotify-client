import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const LikeButton = (props) => {
  return (
    <span onClick={props.handleLikeButtonClick}>
      <FontAwesomeIcon color="gray" icon={faHeart} />
    </span>
  )
};

export default LikeButton;
