import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
const Chatbox = () => {
  let [searchParams] = useSearchParams();
  let userid = searchParams.get("userid");
  let chatid = searchParams.get("chatid");
  
   
  return (
    <div>{chatid}</div>
  )
}

export default Chatbox