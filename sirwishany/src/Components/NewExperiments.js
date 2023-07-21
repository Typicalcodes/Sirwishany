import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const NewExperiments = () => {
  const [datavalue, setDatavalue] = useState(null);
  const [tomessage, setTomessage] = useState(null);
  const [efect,setEfect]=useState(false);
  const [data, setData] = useState("electric");
  const socket = io.connect("http://localhost:3000");
  const sendmessage = (data, message)=>{
    socket.emit("send message", ({data, message}))
  }
  let foreffect ="ff"
  useEffect(() => {
    // Establish a WebSocket connection
    const message = "sender joined"
    const datae = "647acf1a9dd502069887ab00"
    // Listen for WebSocket messages
    socket.emit("create room",(datae))
    console.log("socket connected")
    // Clean up the WebSocket connection on component unmount
    
  },[efect]);

    socket.on("received message", (data)=>{
      console.log(data)

    })
  

  
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
