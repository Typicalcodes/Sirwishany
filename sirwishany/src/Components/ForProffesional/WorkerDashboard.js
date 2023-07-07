import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Cross, UserProfile, Tick } from "../Item Description/svgimports";
import io from "socket.io-client";
const WorkerDashboard = () => {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const statusRef = useRef(status);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statuschecked, setStatuschecked] = useState(null);
  const socket = io.connect("http://localhost:3000");

  const [jobData, setJobData] = useState([]);
  const myarray = [];
  const setProfile = async () => {
    const response = await fetch("http://localhost:3000/prof/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json)
    if (json.loggedin === false) {
      navigate({ pathname: "/login", search: `?page=m` });
    }

    const socketid = `${json.user[0].worktype}${json.user[0].address.city}${json.user[0].address.state}`;
    const message = "Professional Connected";
    socket.emit("join job", { data: socketid, message });

    if (json) {
      try {
        if (json.user[0].status === "Active") {
          setStatuschecked(false);
          setStatus("Active");
          socket.emit("join job", { data: socketid, message });
        } else if (json.user[0].status === "Inactive") {
          setStatuschecked(true);
          setStatus("Inactive");
          socket.disconnect();
        }
      } catch (error) {
        console.log(error);
      }
    }
    await setUser(json);
    setJobData(json.user[0].bookings);
    setLoading(false);
  };
  useEffect(() => {
    setProfile();
  }, []);

  useEffect(() => {

    statusRef.current = status;
  }, [status]);

  const logout = async () => {
    const response = await fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    //console.log(json);
    navigate("/");
  };
  const updateState = async () => {
    setStatuschecked(!statuschecked);
    let statuse = statuschecked ? "Active" : "Inactive";

    setStatus(statuse);
    const body = {
      status: statuse,
    };
    const response = await fetch("http://localhost:3000/prof/updatestate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const json = await response.json();
  };
  const onAccept = (item) => {
    console.log(item);
  };
  useEffect(() => {

  }, [jobData]);

  const handleJobReceived = (userdata) => {


    setJobData((prevState) => {
      if (statusRef.current === "Active") {
     
        try {
          return [...prevState, userdata];
        } catch (error) {
          console.log(error);
        }
      } else if (statusRef.current === "Inactive") {
        try {

          return [...prevState];
        } catch (error) {}
      }
    });
  };

  // useffect for adding the incoming jobs

  useEffect(() => {
    if (user) {
      const socketid = `${user.user[0].worktype}${user.user[0].address.city}${user.user[0].address.state}`;
      const message = "Professional Connected";
      socket.emit("join job", { data: socketid, message });
    }
 
    socket.on("job received", (userdata) => {
  
      handleJobReceived(userdata, status);
    });
    return () => {
      socket.off("job received");
    };
  }, [statusRef.current]);

  return (
    <>
      {user && (
        <>
          <section className="bg-white  pt-4 px-2">
            <section className="bg-white flex w-full items-center justify-between">
              <section className="flex items-center space-x-2">
                <UserProfile width={"40px"} height={"40px"} color={"#6B84DD"} />
                <span className="font-merrisans font-semibold text-xl ">
                  {user.user[0].name}
                </span>
              </section>
              <button
                onClick={() => {
                  logout();
                }}
                className="px-2 py-1 rounded-xl font-semibold bg-[#6B84DD]  border-2 text-white  border-[#6B84DD] text-sm "
              >
                Log Out
              </button>
            </section>
            <section className="border-2 border-[#020614] mt-4 rounded-lg px-8 py-2">
              <section className="flex pt-2  space-x-2 justify-around  mx-auto items-center">
                <section>
                  <label className="bg-white relative">
                    <span className=" absolute right-0 text-base font-semibold ">
                      Status :
                    </span>
                    <input
                      type="checkbox"
                      onChange={() => {
                        updateState();
                      }}
                      checked={statuschecked}
                      className="appearance-none w-0 h-0 mycheckbox"
                    />
                    <span className="slider  "></span>
                  </label>
                </section>
              </section>
              <section className="flex  items-start justify-between mt-4">
                <div className="flex flex-col">
                  <span className="font-medium">Your City : </span>
                  <span>{user.user[0].address.city}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">Proffesion : </span>
                  <span>{user.user[0].worktype}</span>
                </div>
              </section>
            </section>
            <header className="text-left font-bold text-2xl py-4">Jobs</header>
            <section className="flex justify-around ">
              <div className="text-lg font-bold text-[#020614] w-full text-center  ">
                Current
              </div>
              <div className="text-lg font-bold text-[#020614] w-full text-center  ">
                Previous
              </div>
            </section>
            {jobData &&
              jobData.map((item, index) => {
                return (
                  <section key={index}>
                    <div className=" border-2  border-[#6B84DD] rounded-md p-1 my-4 ">
                      <span className="flex items-center justify-between">
                        <div>
                          <span className=" pr-2  font-semibold">Date :</span>
                          <span className="font-medium">
                            {item.date.split("T")[0]}
                          </span>
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
                        {item.address.place}, {item.address.city},
                        {item.address.state}
                      </span>
                      <div className="flex justify-around">
                        <button
                          onClick={() => {
                            onAccept(item);
                          }}
                          className="rounded-full text-base border-2 items-center flex space-x-1 font-semibold px-[8px] py-[4px]"
                        >
                          <Tick width="30px" height="30px" />

                          <span>Accept</span>
                        </button>
                        <button className="rounded-full text-base border-2 items-center flex space-x-1 font-semibold px-[8px] py-[4px]">
                          <Cross width="20px" height="20px" />

                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </section>
                );
              })}
          </section>
        
        </>
      )}
    </>
  );
};

export default WorkerDashboard;
