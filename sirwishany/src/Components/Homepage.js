import React from "react";
import Navbar2 from "./Navbar2";

import Itembox from "./Items Box/Itembox";
import Login from "./Login";
import { useSelector } from "react-redux";
const Homepage = () => {
  const logn = useSelector((state) => state.loginopen);
  return (

    <div className="">
      {logn && <Login />}

      <Navbar2 />
      <Itembox /> 
      <div className="bg-white px-[8px] space-x-4 py-[8px] mt-2 mb-2 h-[10rem] border flex overflow-x-auto scroll-smooth" alt="feature pages">
        <div className="border rounded-md border-[#6B84DD] pt-[8px] space-y-2 px-[12px] min-w-[210px] w-[210px] h-[140px] items-center text-center">
          <span className="text-black font-semibold text-xl leading-10">
            Bargain Your Way
          </span>
          <br/>
          
          <span className="text-base leading-relaxed">
            India's First Site That Allows you to bargain with Your Service Provider
          </span>
        </div>
        <div className="border rounded-md border-[#6B84DD] pt-[8px] space-y-2 px[12px] w-[210px] h-[140px] items-center text-center">
          <span className="text-black font-semibold text-xl leading-10">
            Bargain Your Way
          </span>
          <br/>
          
          <span className="text-base leading-relaxed">
            India's First Site That Allows you to bargain with Your Service Provider
          </span>
        </div>
        <div className="border rounded-md border-[#6B84DD] pt-[8px] space-y-2 px[12px] w-[210px] h-[140px] items-center text-center">
          <span className="text-black font-semibold text-xl leading-10">
            Bargain Your Way
          </span>
          <br/>
          
          <span className="text-base leading-relaxed">
            India's First Site That Allows you to bargain with Your Service Provider
          </span>
        </div>
        <div className="border rounded-md border-[#6B84DD] pt-[8px] space-y-2 px[12px] w-[210px] h-[140px] items-center text-center">
          <span className="text-black font-semibold text-xl leading-10">
            Bargain Your Way
          </span>
          <br/>
          
          <span className="text-base leading-relaxed">
            India's First Site That Allows you to bargain with Your Service Provider
          </span>
        </div>
        <div className="border rounded-md border-[#6B84DD] pt-[8px] space-y-2 px[12px] w-[210px] h-[140px] items-center text-center">
          <span className="text-black font-semibold text-xl leading-10">
            Bargain Your Way
          </span>
          <br/>
          
          <span className="text-base leading-relaxed">
            India's First Site That Allows you to bargain with Your Service Provider
          </span>
        </div><div className="border rounded-md border-[#6B84DD] pt-[8px] space-y-2 px[12px] w-[210px] h-[140px] items-center text-center">
          <span className="text-black font-semibold text-xl leading-10">
            Bargain Your Way
          </span>
          <br/>
          
          <span className="text-base leading-relaxed">
            India's First Site That Allows you to bargain with Your Service Provider
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
