import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../Item Description/svgimports";
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
            <section className="border-2 mt-2 rounded-lg px-8 py-2">
              <section className="flex pt-2  space-x-2 justify-around w-40 mx-auto items-center    mx-auto    ">
                <div className=" text-base font-semibold ">Status : </div>
                <section>
                  <label className=" bg-white relative  items-center flex justify-center ">
                    <input
                      type="checkbox"
                      className="appearance-none mycheckbox"
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
            <span></span>
          </section>
        </>
      )}
    </>
  );
};

export default WorkerDashboard;
