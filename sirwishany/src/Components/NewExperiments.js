import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const NewExperiments = () => {
  const [datavalue, setDatavalue] = useState(null);
  useEffect(() => {
    // Establish a WebSocket connection
    const socket = io.connect("http://localhost:3000");

    // Listen for WebSocket messages
    socket.on("updatejob", (data) => {
      console.log("Received message:", data);
      setDatavalue(data);
      // Update your component's state  with the received data
      
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      {datavalue &&
      <div>
        {datavalue.message}
        dflk
      </div>
      }
    </>
  );
};

export default NewExperiments;
