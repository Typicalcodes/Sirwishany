import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
  return (
    <div className="bg-white px-[8px] flex-col  py-[8px] mt-2 mb-2 ">
      <span className="text-lg font-bold font-merrisans mt-4">Sirwishany</span>
      <br />
      <div className="ml-4 mt-2">
        <span className="text-base mt-2 font-semibold font-merrisans">
          Company
        </span>
        <ul className="ml-5 leading-relaxed text-blue-900">
          <li>
            <a>About Us</a>
          </li>
          <li>
            <a>Terms & Conditions</a>
          </li>
          <li>
            <a>Privacy Policy</a>
          </li>
          <li>
            <a>Careers</a>
          </li>
        </ul>
      </div>
      
      <div className="ml-4 mt-2">
        <span className="text-base mt-2 font-semibold font-merrisans ">
          For Customers
        </span>
        <ul className="ml-5 leading-relaxed text-blue-900 cursor-pointer">
          <li>
            <a>Categories Near You</a>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="ml-4 mt-2">
        <span className="text-base mt-2 font-semibold font-merrisans">
          For Parterns
        </span>
        <ul className="ml-5 leading-relaxed text-blue-900 cursor-pointer">
          <li>
            <a>Register as Proffesional</a>
          </li>
        </ul>
      </div>
      <div className="ml-4 mt-2">
        <span className="text-base mt-2 font-semibold font-merrisans">
          Social Links
        </span>
        <ul className="ml-5 leading-relaxed space-x-1">
        <FacebookIcon className="text-blue-500"/>
        <InstagramIcon className="text-red-400"/>
        <TwitterIcon className="text-blue-500"/>
        </ul>
      </div>
      <span className="text-sm">@Copyright 2023 Sirwishany. All right Reserved</span>
    </div>
  );
};

export default Footer;
