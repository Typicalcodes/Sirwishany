import React, { useEffect, useState } from "react";
import { useNavigate, useParams,useSearchParams } from "react-router-dom";
import {AC,WashingMachine} from "./svgimports";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { changeCategory } from "../../redux/actionCreators/Index";
import Loading from "./Loading";

const Itemsshow = () => {
  let [searchParams]= useSearchParams();
  var item = searchParams.get('category')
  console.log(item)
  const [cat, setCat] = useState(false);
  const [img, setImage] = useState(null);
  var [data,setData] = useState(null);
  const navigate = useNavigate();
  const getingCatDetail = async (item) => {
    const response = await fetch(
      `http://localhost:3000/cat/getCategory/${item}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    console.log(json);
    console.log(json[0].choices);
    const imageData = json[0].image.data; // your binary data
    const blob = new Blob([new Uint8Array(imageData)], { type: "image/*" }); // create a Blob object from binary data
    const imageUrl = URL.createObjectURL(blob); // create a URL for the Blob object

    setImage(imageUrl);
    setCat(true);
    setData(json);
  };

  useEffect(() => {
    getingCatDetail(item);
  }, [item]);

  
  return (
    <>
      {!cat ? (
        <div className="h-screen flex justify-center items-center">
          <Loading/>
        </div>
      ) : (
        <div>
          <div className="z-10 mb-2">
            <div className=" z-10 relative">
              <svg height="100" width="100" fill="none" className=" absolute">
                <circle cx="30" cy="30" r="20" fill="white" />
              </svg>
              <ArrowBackSharpIcon
                onClick={() => navigate(-1)}
                className="absolute top-[13px] left-[12px]"
                fontSize="large"
              />
              <div className="  inset-0 -z-20">
                <img src={img} alt="Ram Ram" />
              </div>
            </div>
            <div className="px-[8px] py-[8px] flex flex-col bg-white ">
              <span className="font-bold opacity-90 text-2xl my-2">{data[0].name}</span>
              <div className=" grid gap-x-2 grid-cols-4">
              {json[0].choices.map(async (item)=>{
                const response = fetch (`http://localhost:3000/cat/getCategory/${item}`)
              })}
              </div>
              
              <button className="border-2 border-[#6B84DD] rounded-full hover:bg-[#6B84DD] hover:text-white  font-semibold text-2xl px-[8px] py-[12px] my-2">Book Now</button>
              <span className="font-bold opacity-90 text-2xl my-2">Includes</span>
              <div className="flex flex-col space-y-2">
                {data[0].Includes.map((item)=>{
                  return (<div key={item} className=" font-merrisans">{item}</div>)
                })}
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Itemsshow;
