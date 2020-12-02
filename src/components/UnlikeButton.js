import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const UnlikeButton = (props) => {
  return (
    <span onClick={props.handleUnlikeButtonClick}>
      <FontAwesomeIcon color="red" icon={faHeart} />
    </span>
  )
};

export default UnlikeButton;
