import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const NewExperiments2 = () => {
  const myarray = [];

  const socket = io.connect("http://localhost:3000");

  const [jobData, setJobData] = useState([]);
  const addingfunction = (item) => {
    setJobData(prev => [...prev, item]);
  };
  useEffect(() => {
  
    console.log("jobata performed",jobData);
  }, [jobData]);

  socket.on("job received", (userdata) => {
    console.log(userdata);
    console.log(jobData);
    addingfunction(userdata)
    

    // Update the jobData state with a new array reference
  });
  const connecttosocket = () => {
    // Establish a WebSocket connection
    
    // Listen for WebSocket messages
    console.log("first effect run")
    const socketid = "ElectricianAgraUttar Pradesh"
    const message = "Professional Connected";
    socket.emit("join job", { data: socketid, message });
    // Clean up the WebSocket connection on component unmount
    
  };
  
  
  return (
    <>
    <div>Message Received</div>

      <div>
        {jobData.map((item, index) => {
              return (
                <section key={index}>
                  <div className=" border-2  border-[#6B84DD] rounded-md p-1 my-4 ">
                    <span className="flex items-center justify-between">
                      <div>
                        <span className=" pr-2  font-semibold">Date :</span>
                        <span className="font-medium">{item.date}</span>
                      </div>
                      <div>
                        <span className=" pr-2  font-semibold">Time :</span>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    </span>
                    <span className=" pr-2  font-semibold">Work :</span>
                    <span className="font-normal">{item.subtype}</span>
                    <h1 className="  font-semibold  "> Address :</h1>
                    <span>
                      {item.address.place} {item.address.city}
                      {item.address.state}
                    </span>
                    <div className="flex justify-around">
                      <button className="rounded-full text-base border-2 items-center flex space-x-1 font-semibold px-[8px] py-[4px]">
                    
                        <span>Accept</span>
                      </button>
                      <button className="rounded-full text-base border-2 items-center flex space-x-1 font-semibold px-[8px] py-[4px]">
                    

                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
            <div className="flex flex-col">
     <button
            onClick={() => {
              console.log(jobData);
            }}
          >
            clickeme
          </button>
     <button
            onClick={() => {
              connecttosocket();
            }}
          >
            clickeme to connect
          </button>
      </div>
      </div>
      }
    </>
  );
};

export default NewExperiments2;
