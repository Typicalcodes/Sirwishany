import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Addresslogo } from "../Item Description/svgimports";
const Bookpage = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let cattype = searchParams.get("type");
  let city = searchParams.get("city");
  const [User, setUser] = useState(null);
  //*state for selected slot
  const [seSelect, setSeSelect] = useState(null);
  const slotse = async (item) => {
    setSeSelect(item);
  };

  const [category, setcategory] = useState(city);
  const [Slots, setSlots] = useState([
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "6:00 PM",
  ]);
  const setprofile = async () => {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    if (json.loggedin === true) {
      setUser(true);
    } else {
      navigate("/login");
    }
    // console.log(user);
  };
  useEffect(() => {
    setprofile();
  }, []);

  //*Testing data for api
  const [adOpen, setAdOpen] = useState(false);
  const openaddress = () => {
    setAdOpen(true);
  };
  const cities = {
    "Uttar Pradesh": ["Agra", "Mathura", "Lucknow", "Kanpur"],
    Rajasthan: ["Jaipur", "Bharatpur", "Sikar"],
    Uttrakhand: ["Haridwar", "Dehradun", "Massorie"],
  };
  const keys = Object.keys(cities);
  const [seCity, setseCity] = useState([]);
  const [seState, setState] = useState(null);
  const [cityse, setCityse] = useState(null);
  const setCity = (item) => {
    setState(item);
    setseCity(cities[item]);
    console.log(cities[item]);
  };

  return (
    <>
      <section className="bg-white mx-auto px-2">
        <header className="text-center text-3xl mx-auto my-2 font-semibold  text-[#020614]">
          Book
        </header>
        <h1 className="text-xl font-semibold text-[#020614]">{cattype} </h1>
        <div className="my-3 flex flex-col ">
          <label className="mb-2">Select Date</label>
          <input
            type="date"
            id="myDate"
            name="myDate"
            className="appearance-none bg-white border w-full border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
          />
          <label className="mb-3 text-[#020614]">Select Time Slot</label>
          <div className="grid grid-cols-4 gap-2 mb-2 ">
            {Slots.map((item) => {
              return (
                <div
                  key={item}
                  onClick={() => {
                    slotse(item);
                  }}
                  className="border text-center rounded-md p-1 "
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className=" text-[#020614]">Select Address</label>
            <button
              onClick={() => {
                openaddress();
              }}
              className="rounded-2xl px-[12px] py-[8px] font-semibold bg-white border"
            >
              + Add
            </button>
          </div>
          {adOpen && (
            <div className="space-y-2 border p-4  fade-transition">
              <input
                className="w-full px-2 py-1 border-b-2 inputbox"
                placeholder="Type Your Address"
                type="text"
              />
              <section>
                <section className="flex justify-evenly space-x-2">
                  <select
                    className="border-2 w-full rounded-md p-2"
                    name="states"
                    id=""
                    onChange={(event) => {
                      if (event.target.value) {
                        setCity(event.target.value);
                      } else {
                        setCityse(null);
                        setseCity([]);
                      }
                    }}
                  >
                    <option value=""></option>
                    {keys.map((item) => {
                      return <option key={item}>{item}</option>;
                    })}
                  </select>
                  <select
                    className="border-2 w-full rounded-md p-2"
                    name="states"
                    id=""
                    onChange={(event) => {
                      setCityse(event.target.value);
                    }}
                  >
                    <option></option>
                    {seCity.map((item) => {
                      console.log(item);
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  
                </section>
              </section>
              <div className="flex justify-end ">
                <button className="rounded-2xl  px-[12px] py-[8px] font-semibold bg-white border" disabled={(seState && cityse) ? false : true }>Save</button>

              </div>
            </div>
          )}
          <section className="w-full border border-1 rounded-md flex justify-between p-2 items-center mb-2">
            <Addresslogo />
            <span className="border-l-2 w-full mx-2 px-2 truncate text-gray-900 text-left">
              H-22, Shastripuram, Agra, UP-282007
            </span>
          </section>
        </div>
      </section>
    </>
  );
};

export default Bookpage;
