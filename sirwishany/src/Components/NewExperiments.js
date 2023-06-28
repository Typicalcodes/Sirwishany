import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const NewExperiments = () => {
  const [datavalue, setDatavalue] = useState(null);
  const [tomessage, setTomessage] = useState(null);
  const [data, setData] = useState("electric");
  const socket = io.connect("http://localhost:3000");
  const sendmessage = (data, message)=>{
    socket.emit("send message", ({data, message}))
  }
  let foreffect ="ff"
  useEffect(() => {
    // Establish a WebSocket connection
    const message = "sender joined"
    const datae = "electrc"
    // Listen for WebSocket messages
    socket.emit("join job",{data: "electric", message});
    
    // Clean up the WebSocket connection on component unmount
    
  },[foreffect]);
  return (
    <>
      {datavalue &&
      <div>
        {datavalue }
        dflk
      </div>

      }
      <Input onChange={(event)=>{setTomessage(event.target.value)}}></Input>
      <Button onClick={()=>{sendmessage(data,tomessage)}}>My Button</Button>
    </>
  );
};

export default NewExperiments;
