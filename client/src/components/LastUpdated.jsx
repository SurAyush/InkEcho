import React from 'react'

import ReactTimeAgo from 'react-time-ago'
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);


const LastUpdated = ({updatedAt,prefix}) => {


  return (
    <div className='last-updated'>{prefix}: <ReactTimeAgo date={new Date(updatedAt)} locale='en-UK'/></div>
  )

}

export default LastUpdated