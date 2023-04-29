import React, { useEffect, useState, useMemo } from "react";
import * as all from "../import";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
const Itembox = () => {
  const [icon, setIcon] = useState("");
  const [construct, setConstruct] = useState(false);

  var pos = useSelector((state) => state.place);
  var services = useSelector((state) => state.changeServices.services);
  var setSe = new Set(pos.services);
  console.log(services);
  const selectCity = () => {
    if (setSe.has(pos.city)) {
      setConstruct(false);
    } else if (pos.city === "Agra" || pos.city === "Mumbai") {
      setConstruct(true);
    }
  };
  useEffect(() => {
    selectCity();
  }, [selectCity]);

  return (
    <div className="px-[8px] flex overflow-x-auto scroll-smooth">
      {services.map((item) => {
        if(item){
        if (item === "Carpenter") {
          var type = "ic:sharp-carpenter";
        }
        else if (item==="Electrician"){
            type = "map:electrician"
        }
        else if (item==="Mechanic"){
          type="bxs:car-mechanic"
        }
        else if (item==="Cleaner"){
          type="mdi:vacuum-cleaner"
        }
        else if (item==="Cook"){
          type="mdi:cook"
        }
        else if (item==="Mechanic"){
          type="bxs:car-mechanic"
        }}
        return (
          <div key={item} className="space-x-[8px] py-[8px] flex ">
            <Link to={`/${item}`}>
            <div className="flex flex-col text-center relative px-[8px] py-[8px] items-center active:bg-[#f5f5f5]  cursor-pointer w-[96px] h-[96px]">
              <Icon icon={`${type}`} width="64" height="64" color="#6B84DD"/>
              <span className=" font-merrisans text-[14px] font-semibold">
                {item}
              </span>
            </div></Link>
          </div>
        );
      })}
    </div>
  );
};

export default Itembox;
