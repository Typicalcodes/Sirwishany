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
    const response = await fetch("http://localhost:3000/user/fetchAddress", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();

    console.log(json);

    if (json) {
      setUser(json);
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
    setAdOpen(!adOpen);
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
    //console.log(cities[item]);
  };

  //* values for saving address
  const [Place, setPlace] = useState("");

  //* to add address on saving
  let error = false;
  const [errorshow, setErrorshow] = useState(false);
  const addAddress = async () => {
    error = false
 //!await is necessary when setting states sometimes
    await setErrorshow(error)
   
    if (Place.length < 5) {
      error = true
    }else{
      error = false
    }
    
    setErrorshow(error)
 
    if (error === false) {
      const savedata = {
        city: cityse,
        state: seState,
        place: Place,
      };
      // console.log(cityse)
      // console.log(seState)
      // console.log(Place)
      const response = await fetch("http://localhost:3000/user/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedata),
        credentials: "include",
      });
      const json = await response.json();
      if (json.acknowledged === true) {
        setprofile();
      }
      
      console.log(json);
    }
  };
  //changing styling on select of addrwss
  const [selectedAddress, setSelectedAddress] = useState(null);
  const selectaddress = (add) => {
    setSelectedAddress(add);
  };
  const changeaddstyle = (add) => {
    if (selectedAddress === add) {
      return { borderColor: "blue", color: "white" };
    }
    return {};
  };
  //changing styling on select of slot
  const [selectedSlot, setSelectedSlot] = useState(null);
  const selectSlot = (slot) => {
    setSelectedSlot(slot);
  };
  const changeslotstyle = (slot) => {
    if (selectedSlot === slot) {
      return { borderColor: "blue" };
    }
    return {};
  };
  // Selected date
  const [selectedDate, setSelectedDate] = useState(null);
  const selectingDate = (event) => {
    setSelectedDate(event.target.value);
  };
  
  return (
    <>
      <section className="bg-white mx-auto px-2">
        <div className="flex items-center justify-center mt-2">
        <header className="text-center text-2xl mx-auto my-2 font-semibold  text-[#020614]">
        {cattype}
        </header>
        <div className="flex">
        <button className="rounded-2xl  px-[12px] py-[8px] font-semibold bg-[#6B84DD]  text-white">Book</button>
        </div>
        </div>
       
        <div className="my-3 flex flex-col ">
          <label className="mb-2 text-[#6B84DD] font-semibold">Select Date</label>
          <input
            type="date"
            id="myDate"
            name="myDate"
            onChange={selectingDate}
            className=" bg-white border w-full border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2"
          />
          <label className="mb-3 text-[#6B84DD] font-semibold">Select Time Slot</label>
          <div className="grid grid-cols-4 gap-2 mb-2 ">
            {Slots.map((item) => {
              return (
                <div
                  key={item}
                  onClick={() => {
                    setSelectedSlot(item);
                  }}
                  className="border text-center rounded-md p-1 "
                  style={changeslotstyle(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className=" text-[#6B84DD] font-semibold">Select Address</label>
            <button
              onClick={() => {
                openaddress();
              }}
              className="rounded-2xl px-[12px] py-[8px] font-semibold bg-white border"
            >
             {adOpen ? "-":"+"} Add
            </button>
          </div>
          {adOpen && (
            <div className="space-y-2 border p-4  mb-2 fade-transition">
              <input
                className="w-full px-2 py-1 border-b-2 inputbox"
                placeholder="Type Your Address"
                type="text"
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
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
                      //console.log(item);
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
                <button
                  className="rounded-2xl  px-[12px] py-[8px] font-semibold bg-white border"
                  onClick={() => {
                    addAddress();
                  }}
                  disabled={seState && cityse ? false : true}
                >
                  Save
                </button>
              </div>
              {errorshow && <span className={`text-red-700 font-semibold ${errorshow ? 'error-change ' : 'error-change back'}`}>Write a long address</span>}
            </div>
          )}
          <section>
            {User &&
              User.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      selectaddress(item);
                    }}
                    style={changeaddstyle(item)}
                    className="w-full border border-1 rounded-md flex justify-between p-2 items-center mb-2"
                  >
                    <Addresslogo />

                    <span className="border-l-2 w-full mx-2 px-2 truncate text-gray-900 text-left">
                      {item.place}, {item.city}, {item.state}
                    </span>
                  </div>
                );
              })}
          </section>
        </div>
      </section>
    </>
  );
};

export default Bookpage;
