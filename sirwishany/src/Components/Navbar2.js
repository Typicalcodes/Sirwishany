import { React, useEffect, useState, useLayoutEffect, useRef } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import {
  changeCity,
  openlogin,
  changeService,
  editnotification,
} from "../redux/actionCreators/Index";
import { UserProfile } from "./Item Description/svgimports";
import Loading from "../Components/Item Description/Loading";
import Footer from "./Footer";
import socketManager, {
  connectSocket,
  disconnectSocket,
  userEmit,
  sendMessage,
  getMessage,
} from "../socketManager";

const Navbar2 = () => {
  const notification = useSelector((state) => state.editNotification);
  const [efect, setEfect] = useState(false);

  const dispatch = useDispatch();  
  const cityselect = bindActionCreators(changeCity, dispatch);
  const logindone = bindActionCreators(openlogin, dispatch);
  const ChangeServices = bindActionCreators(changeService, dispatch);
  const EditNotification = bindActionCreators(editnotification, dispatch);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState([
    { name: "Agra", id: "-1" },
    { name: "D", id: "-2" },
  ]);
  const [showInput, setshowInput] = useState(true);
  const ref = useRef(null);
  const getallcity = async () => {
    const response = await fetch("http://localhost:3000/api/getallcity", {
      method: "GET",
    });
    const json = await response.json();
    // console.log(json);
    setCity(json);
  };
  const [value, setValue] = useState("Agra, Uttar Pradesh");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  useLayoutEffect(() => {
    getallcity();
    // console.log(getallcity());
  }, []);
  const onSearch = () => {
    setValue("");
    // console.log("search");
  };

  // a function to set profile
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
      if (!efect) {
        userEmit(json.user._id);
      }
      setUser(true);
      console.log("socket connected " + json.user._id);
      setEfect(true);
    }
    setLoading(false);
    // console.log(user);
  };
  useEffect(() => {
    connectSocket();
    if (!efect) {
      setprofile();
    }
    return () => {
      disconnectSocket("navbar");
     };
  }, [efect]);

  //FIXME - receiving message
  useEffect(() => {
    getMessage((item)=>{
      setprofile()
      console.log(item)
    })
    return () => {
      disconnectSocket("navbar");
     };
  }, [])
  
  // on clicking item
  const onClickItem = async (name, state, id, services) => {
    await setshowInput(true);
    setValue(`${name}, ${state}`);
    cityselect({ name, state });
    // console.log(services);
    ChangeServices(services);
    // console.log(value);
  };
  //Function for open input whenclickng on city
  const onClickCity = async () => {
    await setshowInput(false);
    onSearch(value);
    ref.current.focus();
    // console.log(showInput);
  };
  return (
    <>
      <div className="space-y-[8px] px-[8px] pt-[8px] bg-white ">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col">
            <span className="font-merrisans pb-0 bottom-0 text-[29px] font-extrabold mb-0 text-[#6B84DD]">
              SirWishAny
            </span>
            <span className="font-merrisans  relative -top-2 backdrop:text-[14px] font-extrabold mb-0 text-[#6B84DD]">
              Services at your Doorstep
            </span>
          </div>

          <div>
            <div className="text-green-500 "></div>
            {user ? (
              <Link
                onClick={() => {
                  EditNotification();
                }}
                to="/profile"
              >
                <UserProfile
                  width={"60px"}
                  height={"60px"}
                  notif={notification}
                />
              </Link>
            ) : (
              <Link
                to={{ pathname: "/login", search: `?page=m` }}
                className="font-merrisans bg-[#313335] text-white font-semibold rounded-full px-[24px] py-[8px]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="flex flex-row mt-[4px] py-[4px] items-center">
            {showInput && <LocationOnIcon onClick={() => onSearch()} />}
            {showInput && (
              <span
                onClick={() => onClickCity()}
                className="cursor-pointer font-semibold text-lg opacity-75 "
              >
                {value}
              </span>
            )}
            {showInput ? (
              ""
            ) : (
              <input
                ref={ref}
                className="w-full mb-0 px-[8px] py-[4px] border"
                placeholder="Select City"
                onChange={onChange}
                value={value}
              ></input>
            )}
          </div>
          <div className="relative">
            {!showInput && (
              <span className="font-merrisans absolute z-10 w-full ">
                {city
                  .filter((item) => {
                    const SearchTerm = value.toLowerCase();
                    const name = item.name.toLowerCase();
                    return SearchTerm && name.startsWith(SearchTerm);
                  })
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() =>
                        onClickItem(
                          item.name,
                          item.state,
                          item.id,
                          item.services
                        )
                      }
                      className="textflex px-[8px] py-[4px] bg-white border w-full flex-col"
                    >
                      {item.name}, {item.state}
                    </div>
                  ))}
              </span>
            )}
          </div>
          <div className="relative w-full z-0 mt-[4px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
              placeholder="Search"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
