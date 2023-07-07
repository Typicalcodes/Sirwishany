import React, { useState, useEffect, useSyncExternalStore, useRef, useCallback } from "react";
import io from "socket.io-client";
const Exper = () => {
  const [statusc, setStatusc] = React.useState(null);
  const statusRef = useRef(statusc)
  React.useEffect(() => {
    console.log(statusc);
    statusRef.current = statusc 
  }, [statusc]);
  const socket = io.connect("http://localhost:3000");
  const handleJobReceived = useCallback(() => {
    console.log('The status of a person is ' + statusc);
    setStatusc(statusc === 'active' ? 'inactive' : 'active');
  },[statusc]);
  useEffect(()=>{
    console.log("first effect run")
    const socketid = "ElectricianAgraUttar Pradesh"
    const message = "Professional Connected";
    socket.emit("join job", { data: socketid, message });
    // Clean up the WebSocket connection on component unmount
},[])


  React.useEffect(() => {
    console.log("first effect run")
    const socketid = "ElectricianAgraUttar Pradesh"
    const message = "Professional Connected";
    socket.emit("join job", { data: socketid, message });

    const checkstatus= ()=>{
      console.log("checkd status is ",statusRef.current)
    }
    checkstatus();
    const jobReceivedCallback = (userdata) => {
      console.log(userdata);
      console.log(statusRef.current);
    };

    socket.on("job received", jobReceivedCallback);
    return ()=>{
      socket.off('job received')
    }
   
  }, [statusRef.current]);
  return<button onClick={handleJobReceived}>change status</button>;
  
};

export default Exper;
