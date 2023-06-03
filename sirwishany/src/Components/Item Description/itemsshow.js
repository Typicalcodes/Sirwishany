import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AC, WashingMachine } from "./svgimports";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { changeCategory } from "../../redux/actionCreators/Index";
import Loading from "./Loading";

const Itemsshow = () => {
  let [searchParams] = useSearchParams();
  var item = searchParams.get("category");
  const [user,setUser]=useState("user");
  const [svgs, setSvgs] = useState([{ name: "fdf", category: "fsdf" }]);
  const [cat, setCat] = useState(false);
  const [img, setImage] = useState(null);
  var [data, setData] = useState(null);
  const navigate = useNavigate();
  const getingCatDetail = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cat/getCategory/${item}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      // console.log(json);
      // console.log(json[0].choices);
      const imageData = json[0].image.data; // your binary data
      const blob = new Blob([new Uint8Array(imageData)], { type: "image/*" }); // create a Blob object from binary data
      const imageUrl = URL.createObjectURL(blob); // create a URL for the Blob object

      setImage(imageUrl);
      const array = []; // create a URL for the Blob object

      setData(json);
      await Promise.all(
        json[0].choices.map(async (item) => {
          const response = await fetch(
            `http://localhost:3000/choice/selectsvg/${item}`,
            { method: "GET" }
          );
          const json = await response.json();
          const imageData = await json[0].svg.data;
          // console.log(json[0].svg.data); // your binary data
          const blob = new Blob([new Uint8Array(imageData)], {
            type: "image/*",
          }); // create a Blob object from binary data
          const imageUrl = URL.createObjectURL(blob);
          array.push({ name: item, category: imageUrl });
          setSvgs(array);
        })
      );
      // console.log(array);

      // console.log(svgs);
      setTimeout(() => {
        setCat(true);
      }, 300);
      // console.log(cat);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    getingCatDetail(item);
  }, [item]);

  useEffect(() => {
    // console.log(svgs);
    const data = localStorage.getItem("login");
    if (data){
     setUser(data)
    }
  }, [svgs]);
//todofsf
  //function for linking to profile menu

  return (
    <>
      {!cat ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="z-10 mb-2">
            <div className=" z-10 relative">
              <svg height="100" width="100" fill="none" className=" absolute">
                <circle cx="30" cy="30" r="20" fill="white" />
              </svg>
              {/* this works*/}
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
              <span className="font-bold opacity-90 text-2xl my-2">
                {data[0].name}
              </span>
              <div className=" grid gap-x-2 grid-cols-4">
                {svgs.map((item) => {
                  // console.log(item);
                  return (
                    <section key={item.name} onClick={()=>{}} className="mx-2 flex flex-wrap-reverse  flex-row items-center justify-center text-center ">
              <figcaption className="font-semibold text-lg text-gray-700">{item.name}</figcaption>
                      <img
                      className="object-cover p-1 w-auto h-auto"
                        src={item.category}
                        key={item.name}
                        alt="svgs of icons"
                      />
                       
                    </section>
                  );
                })}
              </div>

              {!svgs ? <button className="border-2 border-[#6B84DD] rounded-full hover:bg-[#6B84DD] hover:text-white  font-semibold text-2xl px-[8px] py-[12px] my-2">
                Book Now
              </button> : <div></div>}
              <span className="font-bold opacity-90 text-2xl my-2">
                Includes
              </span>
              <div className="flex flex-col space-y-2">
                {data[0].Includes.map((item) => {
                  return (
                    <div key={item} className=" font-merrisans">
                      {item}
                    </div>
                  );
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
