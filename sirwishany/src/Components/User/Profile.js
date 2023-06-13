import React, { useEffect, useState } from "react";
import Loading from "../Item Description/Loading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserProfile } from "../Item Description/svgimports";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const setprofile = async () => {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    if (json.loggedin === true) {
      await setUser(json);
      console.log(user);
      setLoading(false);
    }else{
      setLoading(true)
    }
    console.log(user);
    
    // console.log(user);
  };
  useEffect(() => {
    setprofile();
  }, []);
  // to check updated state
  const check = () => {
    console.log(user);
  };

  //! deleting the user ID for log out
  const logout= async ()=>{
    const response = await fetch("http://localhost:3000/user/logout",{
      method: "GET",
      credentials: "include"
    })
    const json = await response.json();
    console.log(json)
    navigate("/")
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="px-2 py-2 bg-white">
          <section className="flex items-center justify-between">
            
          <div className="  ">
            
            <ArrowBackSharpIcon
              onClick={() => navigate(-1)}
              className=" "
              sx= {{fontSize: 32}}
            />
          </div>
            <button onClick={()=>{logout()}} className="px-3 py-2 rounded-xl font-semibold  border-1 border border-[#6B84DD] text-sm ">Log Out</button>
          </section>
          <section className="mt-4 items-center text-center bg-white">
            <figure className="flex w-full items-center text-center content-center bg-white justify-center  ">
              <UserProfile width={"120px"} height={"120px"} />
            </figure>
            <header>
              <h3 className="text-gray-900 text-xl font-bold p-2 ">
                {user.user[0].name}
              </h3>
            </header>
            <span className="font-semibold mt-3 p-1">Phone No : </span>
            <span>{user.user[0].phoneNo}</span>
          </section>
          <section className="bg-white mt-4">
            <header className="font-bold text-xl drop-shadow-md">Bookings</header>
            {user.user[0].bookings.map((item,index) => {
              return (
                <section key={index}>
                <div className=" border-2  border-[#6B84DD] rounded-md p-1 my-2 items-center">
                  <span className="flex">
                  <span className=" pr-2 text-sm font-semibold">Date : </span>
                  <span className=" text-sm">{item.date.split("T")[0]}</span>
                  
                  </span>
                  <h1 className="font-bold text-lg">{item.worktype}</h1>
                </div>
                
                </section>
              );
            })}
          </section>
        </section>
      )}
      
    </>
  );
};

export default Profile;
