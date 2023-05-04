import React from "react";

const Footer = () => {
  return (
    <div className="bg-white px-[8px] flex-col  py-[8px] mt-2 mb-2">
      <span className="text-lg font-bold font-merrisans mt-4">Sirwishany</span>
      <br />
      <div className="ml-4 mt-2">
        <span className="text-base mt-2 font-semibold font-merrisans">
          Company
        </span>
        <ul className="ml-5">
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
        <span className="text-base mt-2 font-semibold font-merrisans">
          For Customers
        </span>
        <ul className="ml-5">
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
          Social Links
        </span>
        <ul className="ml-5">
          
        </ul>
      </div>
    </div>
  );
};

export default Footer;
