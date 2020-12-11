import React from 'react';
import style from './index.module.scss'

const PreviewTrack = (props) => {
  return (
    <div className={style.previewTrack}>
      <audio controls>
        <source src={props.previewUrl} type="audio/mpeg" />
      </audio>
    </div>
  )
};

export default PreviewTrack;
