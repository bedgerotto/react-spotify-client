import React from 'react';
import './style.css'

const PreviewTrack = (props) => {
  return (
    <>
      <audio controls>
        <source src={props.previewUrl} type="audio/mpeg" />
      </audio>
    </>
  )
};

export default PreviewTrack;
