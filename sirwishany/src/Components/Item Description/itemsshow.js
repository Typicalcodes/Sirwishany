import React from "react";
import { useNavigate } from 'react-router-dom';
import { Carpenter } from "./Imports";
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
const Itemsshow = () => {
  let navigate = useNavigate();  
  return (
    <div className="relative ">
    <svg height="100" width="100" fill="none" className=" absolute">
  <circle cx="30" cy="30" r="20"  fill="white" />

  </svg> 

  <ArrowBackSharpIcon onClick={() => navigate(-1)} className="absolute top-[13px] left-[12px]" fontSize="large"/>
      <div className=" absolute inset-0 -z-20">
        <img src={Carpenter} alt="Ram Ram"/>
      </div>
      
    </div>
  );
};

export default Itemsshow;