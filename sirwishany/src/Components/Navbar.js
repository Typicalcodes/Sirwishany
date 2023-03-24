import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Navbar = () => {
  return (
    <div className="top-0  lg:px-[40px] lg:py-[16px]  lg:border-2 justify-between flex items-center">
      <div className="font-merrisans  text-[33px] lg:text-[21px] font-extrabold  text-[#6B84DD] ">
        SirWishAny
      </div>
      <div className="font-merrisans text-[#313335] md:font-medium hidden lg:block">Services</div>
      <div className="font-merrisans text-[#313335] md:font-medium hidden lg:block">Jobs</div>
      <div className="font-merrisans text-[#313335] md:font-medium hidden lg:block">Cities</div>
      <div className=" py-[2px] drop-shadow-sm">
      <div className="border-2 w-[768px] rounded-xl px-[8px]"> 
      <div className="flex py-[4px]">
      <SearchOutlinedIcon className="text-[#313335] opacity-25 border-r-2 "/>
      <input className="w-full px-[8px] border-0 bg-white !outline-none text-[#313335] text-opacity-75 rounded-r-lg active:border-0 " placeholder="Search any...."/>
      </div>

      </div>
      </div>
      <div className="items-center flex flex-row px-2 space-x-2 cursor-pointer">
        <LocationOnIcon className="text-[#313335]"/>
        <div className="flex flex-col text-center">
          <span className="foont-merrisans text-[#313335] mb-0">Select City</span>
          <span>Agra</span>
        </div>
        
      </div>
      <div className="font-merrisans text-[#313335] font-medium">Help</div>
      <div className="font-merrisans text-[#313335] font-semibold">Login</div>
      <button className="px-[24px] py-[8px] bg-[#313335] text-white rounded-lg font-merrisans">Sign Up</button>
    </div>
  );
};

export default Navbar;
