import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cross, UserProfile, Tick } from "../Item Description/svgimports";
const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setProfile = async () => {
    const response = await fetch("http://localhost:3000/prof/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();

    if (json.loggedin === false) {
      navigate({ pathname: "/login", search: `?page=m` });
    }
    await setUser(json);

    setLoading(false);
    // console.log(user);
  };
  useEffect(() => {
    setProfile();
  }, []);
  const logout = async () => {
    const response = await fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    navigate("/");
  };
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
              <section className="flex pt-2  space-x-2 justify-around  mx-auto items-center       ">
                <section>
                  <label className=" bg-white relative    ">
                <span className=" absolute right-0 text-base font-semibold ">Status : </span>
                    <input
                      type="checkbox"

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
            <section>
              <div className=" border-2  border-[#6B84DD] rounded-md p-1 my-4 ">
                <span className="flex items-center justify-between">
                  <div>
                  <span className=" pr-2  font-semibold">Date :</span>
                  <span className="font-medium">22-03-2023</span>
                  </div>
                  <div>
                  <span className=" pr-2  font-semibold">Time :</span>
                  <span className="font-medium">05:00 AM</span>
                  </div>
                </span>
                <h1 className="  font-semibold  "> Address :</h1>
                <span> H-21 Shastripuram Sikandra, Uttar Pradesh Agra </span>
                <div className="flex justify-around">
              <button class="rounded-full text-base border-2 items-center flex space-x-1 font-semibold px-[8px] py-[4px]">
                <Tick width="30px" height="30px"/>
                
                <span>Accept</span>
                
              </button>
              <button class="rounded-full text-base border-2 items-center flex space-x-1 font-semibold px-[8px] py-[4px]">
                <Cross width="20px" height="20px"/>
                
                <span>Reject</span>
                
              </button>
              </div>
              </div>
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default WorkerDashboard;
