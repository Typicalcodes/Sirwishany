import React from "react";

import { useSelector } from "react-redux";
const ServicesList = () => {
  var services = useSelector((state) => state.changeServices.services);

  return (
    <>
    <div className="bg-white px-[8px] flex-col  py-[8px] mt-2 mb-2 ">
      <span className="text-xl font-semibold">Most Booked Services</span>
      <div className="space-x-1 custom-scrollbar  flex overflow-x-auto overflow-hidden scroll-smooth my-2">
        {services.filter((item)=>{return "Carpenter"}).map((item) => {
          var image = `${item}.jpg`;
        
          return (
            <div className="rounded-lg  pt-[8px] space-y-2 px-[12px] " key={item}>
              <div className="min-w-[90px] w-[90px] min-h-[80px] max-h-[80px] object-fill items-center content-center">
                <img
                  className="rounded-lg min-w-[90px] w-[90px] min-h-[80px] max-h-[80px]"
                  src={require(`../../Images/${image}`)}
                  alt={item}
                />
              </div>
              <div className="mt-2 font-semibold text-base ">
              {item}
              </div>
            </div>
          );
        })}
      </div>
    
    </div>
    
    <div className="bg-white px-[8px] flex-col  py-[8px] mt-2 mb-2 ">
      <span className="text-xl font-semibold">Repairing</span>
      <div className="space-x-1 custom-scrollbar  flex overflow-x-auto overflow-hidden scroll-smooth my-2">
        {services.map((item) => {
          var image = `${item}.jpg`;
          
          if (item === "Carpenter" || item === "Electrician" || item=== "Mechanic"){
          return (
            <div className="rounded-lg  pt-[8px] space-y-2 px-[12px] " key={item}>
              <div className="min-w-[90px] w-[90px] min-h-[80px] max-h-[80px] object-fill items-center content-center">
                <img
                  className="rounded-lg min-w-[90px] w-[90px] min-h-[80px] max-h-[80px]"
                  src={require(`../../Images/${image}`)}
                  alt={item}
                />
              </div>
              <div className="mt-2 font-semibold text-base ">
              {item}
              </div>
            </div>
          )};
        })}
      </div>
    </div>
    <div className="bg-white px-[8px] flex-col  py-[8px] mt-2 mb-2 ">
      <span className="text-xl font-semibold">House Keeping</span>
      <div className="space-x-1 custom-scrollbar  flex overflow-x-auto overflow-hidden scroll-smooth my-2">
        {services.map((item) => {
          var image = `${item}.jpg`;
          
          if (item === "Cook" || item === "Cleaner" || item=== "Designer"){
          return (
            <div className="rounded-lg  pt-[8px] space-y-2 px-[12px] " key={item}>
              <div className="min-w-[90px] w-[90px] min-h-[80px] max-h-[80px] object-fill items-center content-center">
                <img
                  className="rounded-lg min-w-[90px] w-[90px] min-h-[80px] max-h-[80px]"
                  src={require(`../../Images/${image}`)}
                  alt={item}
                />
              </div>
              <div className="mt-2 font-semibold text-base ">
              {item}
              </div>
            </div>
          )};
        })}
      </div>
    </div>
    </>
  );
};

export default ServicesList;
