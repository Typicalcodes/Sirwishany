import React from "react";
import Navbar2 from "../Navbar2";

import Itembox from "../Items Box/Itembox";
import Login from "../Login";
import { useSelector } from "react-redux";
import Featurepage from "./Featurepage";
import ServicesList from "./ServiceList";
const Homepage = () => {
  const logn = useSelector((state) => state.loginopen);
  return (

    <div className="">
      {logn &&  <Login />}

      <Navbar2 />
      <Itembox /> 
      <Featurepage/>
      <ServicesList/>
    </div>
  );
};

export default Homepage;
