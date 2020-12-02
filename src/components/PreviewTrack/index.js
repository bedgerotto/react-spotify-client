import React from 'react';

const PreviewTrack = (props) => {
  return (
    <div style={{width: props.size}}>
      <audio style={{width: props.size}} controls>
        <source src={props.previewUrl} type="audio/mpeg" />
      </audio>
    </div>
  )
};

export default PreviewTrack;
