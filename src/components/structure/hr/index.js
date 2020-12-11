import React from 'react';

import hr from './index.module.scss'

const Hr = ({ type }) => {
  const name = type || 'dark'

  return <hr className={hr[name]} />
}

export default Hr;
