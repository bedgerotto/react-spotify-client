import React from 'react'

import style from './index.module.scss'

const DetailHeader = (props) => {
  return (
    <div className={style.detailHeader}>
      { props.children }
    </div>
  )
}

export default DetailHeader;
