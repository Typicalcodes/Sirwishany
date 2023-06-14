import React, { useState } from "react";
import { TextField } from "@mui/material";
const Firstlogin = () => {
  const typeswork = ["Electrician", "Mechanic", "Cleaner", "Cook"];
  const cities = {
    "Uttar Pradesh": ["Agra", "Mathura", "Lucknow", "Kanpur"],
    Rajasthan: ["Jaipur", "Bharatpur", "Sikar"],
    Uttrakhand: ["Haridwar", "Dehradun", "Massorie"],
  };
  const keys = Object.keys(cities);
  const [seCity, setseCity] = useState([]);
  const [seState, setState] = useState(null);
  const [cityse, setCityse] = useState(null);
  const [Name, setName] = useState(null);
  const [Worktype, setWorktype] = useState(null);
  const [Status, setStatus] = useState(null); 
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
  const saveprofile = async () => {
    error = false;
    //!await is necessary when setting states sometimes
    await setErrorshow(error);

    if (Place.length < 5) {
      error = true;
    } else {
      error = false;
    }

    setErrorshow(error);
    console.log(cityse,seState,Place);
    console.log(Name, Worktype)
    if (error === false) {
      const savedata = {
        city: cityse,
        state: seState,
        place: Place,
      };
    }
  };
  return (
    <section className="items-center p-4 mt-12 bg-white">
      <header className="text-center text-2xl font-bold p-2 mb-2">
        Create Account
      </header>
      <div className="flex flex-col text-left px-2 ">
        <label className="text-left font-merrisans font-semibold">Name</label>
        <input onChange={(event)=>{setName(event.target.value)}} className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500 mt-1" />
        <label className="text-left font-merrisans font-semibold mt-4">
          Work Type
        </label>
        <select defaultValue="Electrician" onChange={(event)=>{setWorktype(event.target.value)}} className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500 mt-1">
          {typeswork.map((item) => {
            return (
              <option
                className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500"
                key={item}
              >
                {item}
              </option>
            );
          })}
        </select>
        <label className="text-left font-merrisans font-semibold mt-4">
          Address
        </label>
        <div className="space-y-2     rounded-md  mb-2 fade-transition mt-1 ">
        <input placeholder="Write your address" className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500 mt-1" />

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
                  return (
                    <option className="text-justify break-words" key={item}>
                      {item}
                    </option>
                  );
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
          <div className="flex justify-between items-center ">
            {errorshow && (
              <span
                className={`text-red-700 font-semibold ${
                  errorshow ? "error-change " : "error-change back"
                }`}
              >
                Write a long address
              </span>
            )}
            <div className="">
              <span className="align-text-top text-red-600">Note:-</span>
              <span className="text-sm font-merrisans">
                Gigs will be given to you on the basis of your District.
              </span>
            </div>
          </div>
        </div>
        <label className="text-left font-merrisans font-semibold mt-4">
          Status
        </label>
        <select defaultValue="Active" onChange={(event)=>{setStatus(event.target.value)}} className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500 mt-1">
          <option className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500">Active</option>
          <option className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500">Inactive</option>
        </select>
        <section className="mt-6 text-center">        
        <input type="checkbox" id="tccheckbox"/> <label htmlFor="tccheckbox">I agree to the terms and conditions.</label>
        </section >
          <button onClick={()=>{saveprofile()}} className="rounded-full border mx-auto px-4 py-1 text-lg font-bold mt-4 bg-[#6B84DD] text-white"> Submit </button>  
      </div>
    </section>
  );
};

export default Firstlogin;
