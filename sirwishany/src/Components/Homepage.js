import React from "react";
import Navbar2 from "./Navbar2";
import img from ".././Images/Plumber.png";
import Itembox from "./Items Box/Itembox";
import Login from "./Login";
import { useSelector } from "react-redux";
const Homepage = () => {
  const logn = useSelector((state) => state.loginopen);
  return (
    <div>
      {logn && <Login />}

      <Navbar2 />
      <Itembox />
      <div className="container relative ">
        <img
          src={img}
          className="rounded-xl absolute w-auto px-[8px]  object-fit items-center justify-center"
          alt=""
        />
        <span className="absolute top-2 right-6 font-merri font-bold text-xl text-white ">
          Professionals <br /> Plumbers
        </span>
      </div>
    </div>
  );
};

export default Homepage;
