import React from 'react';
import { Image } from 'react-bootstrap';

const Thumbnail = (props) => {
  const src = Array.isArray(props.imageSrc) ? props.imageSrc[0].url : props.imageSrc

  return (
    <Image width="90%" src={src} rounded />
  )
}

export default Thumbnail;
