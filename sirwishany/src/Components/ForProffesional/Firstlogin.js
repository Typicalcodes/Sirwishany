import React, { useState } from "react";
import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const Firstlogin = () => {
  const navigate = useNavigate();
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
  const [Worktype, setWorktype] = useState("Electrician");
  const [Status, setStatus] = useState("Active"); 
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
  const [errorname, setErrorname] = useState("")
  const saveprofile = async () => {
    error = false;
    //!await is necessary when setting states sometimes
    await setErrorshow(error);

    if (Place.length < 5) {
      error = true;
      setErrorname("Write a long address")
    } else if (checked === false){
      error = true;
      setErrorname("Check the Terms and Conditions")
    } else{
      error =false;
    }
    

    setErrorshow(error);

    if (error === false) {
      const data = {
        address: {
    
          city: cityse,
          state: seState,
          place: Place,
        },
        name: Name,
        status: Status,
        worktype: Worktype
      }
      const response = await fetch("http://localhost:3000/prof/updateuser", {
        method : "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
      })
      const json = await response.json()
      if (json.loggedin === false){
        navigate({pathname: "/login", search: `?page=m`})
      }
    }
  };

  //*checkbox control
  const [checked, setChecked] = useState(false)
  return (
    <>
     <Toaster toastOptions={{ duration: 2000 }} />
    <section className="items-center p-4 mt-8 bg-white">
    
      <header className="text-center mt-2 text-2xl font-bold p-2 mb-2">
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
        <input onChange={(event)=>{setPlace(event.target.value)}} placeholder="Write your address" className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6B84DD] focus:border-blue-500 mt-1" />

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
          <div className="flex flex-col justify-between   ">
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
        {errorshow && (
              <span
                className={`text-red-700 text-center items-center mt-2   flex justify-center font-semibold ${
                  errorshow ? "error-change " : "error-change back"
                }`}
              >
                {errorname}
              </span>
            )}
        <section className="mt-2 text-center">        
        <input type="checkbox" id="tccheckbox" checked={checked} onChange={()=>{setChecked(!checked);  console.log(checked)}}/> <label htmlFor="tccheckbox">I agree to the terms and conditions.</label>
        </section >
          <button onClick={()=>{if (Name && Worktype && Status && cityse && setState ){ saveprofile()}else{ toast.error("Fill all Details")}}} className="rounded-full border mx-auto px-4 py-1 text-lg font-bold mt-4 bg-[#6B84DD] text-white"> Submit </button>  
      </div>
     
    </section>
    </>
  );
};

export default Firstlogin;
