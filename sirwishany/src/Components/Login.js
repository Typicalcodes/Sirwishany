import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { openlogin } from "../redux/actionCreators/Index";
import { useNavigate, useLocation, useSearchParams, redirect } from "react-router-dom";
import { ProfLogo } from "./Item Description/svgimports";
const Login = () => {
   let [searchParams] = useSearchParams();
   let page = searchParams.get("page");
 const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [Ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const loginclose = bindActionCreators(openlogin, dispatch);

  //*state for checking if prof login
  const [proflogin, setProflogin] = useState(false);
  const captechaverify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  };
  const onSignup = () => {
    setLoading(true);
    captechaverify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + Ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("Otp Sended Succesfully");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        // ...
      });
  };

  //
  const OtpVerify = async () => {
    setLoading(true);
    try {
      await window.confirmationResult.confirm(otp).then(async (res) => {
        console.log(res.user.metadata);
        setUser(res.user);
        console.log(Ph);
        const data = {
          phoneNo: Ph,
        };
        // Creating a fetching request for login
        if (proflogin === false) {
          const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          });
          console.log(response);
          setTimeout(() => {
            console.log("back");
            if (page === "m") {
              navigate("/");
            }else if (page === "b"){
             navigate(-2)
            }
          }, 500);
          toast.success("Logged in Successfully");
        } else {
          const response = await fetch("http://localhost:3000/prof/createuser",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          })
          const json= await response.json();
          console.log(json)
          setTimeout(() => {
       
            if (json.newuser) {
              navigate("/firstlogin");
            }else {
              navigate("/profdashboard")
            }
          }, 500);
          toast.success("Logged in Successfully");
        }

        setLoading(false);

        
      });
    } catch (error) {
      console.error(error.code);
      if (error.code === "auth/code-expired") {
        toast.error("Otp Expired");
      } else {
        toast.error("Invalid Otp");
      }
      setLoading(false);
      setOtp("");
    }
  };

  return (
    <div className="absolute top-0 right-0 w-full  bg-gray-200 h-screen p-2 z-50 mx-auto border">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div
        onClick={() => {
          setProflogin(!proflogin);
        }}
        className="flex    mb-3 relative"
      >
        <span className="absolute roboto-font text-[#6B84DD] cursor-pointer right-0 underline-offset-1 underline  text-right">
          Login as {!proflogin ? "Proffessional" : "User"}
        </span>
      </div>
      {proflogin && (
        <figure className="flex  items-center object-cover justify-center opacity-animation ">

          <ProfLogo width="15rem" height="15rem" />
        </figure>
      )}
      {proflogin && (
        <header className="center font-merri font-bold opacity-75 mb-[8px] text-center text-2xl opacity-animation ">
          Proffessional Login
        </header>
      )}
      <div id="recaptcha-container" className=""></div>
      {user ? (
        <h2 className="mx-auto text-center mt-[64px]">Login Success </h2>
      ) : (
        <div
          className={` relative ${
            !proflogin && "mt-[54px]"
          } px-[72px] flex flex-col items-center   text-center`}
        >
          {showOtp ? (
            <>
              <span className="center font-merri font-bold opacity-75 mb-[8px]">
                Enter The Otp
              </span>
              <OtpInput
                OTPLength={6}
                value={otp}
                onChange={setOtp}
                otpType="number"
                disabled={false}
                autoFocus
                className="flex text-black mb-[8px]"
              ></OtpInput>

              <button
                onClick={OtpVerify}
                className="rounded-md px-[14px] py-[8px] items-center justify-center flex bg-black bg-opacity-75 text-white text-opacity-75 w-full mb-[8px"
              >
                {loading && <CgSpinner size={20} className="animate-spin" />}
                Verify OTP
              </button>
            </>
          ) : (
            <>
              <span className="center font-merri font-bold opacity-75 mb-[8px]">
                Login via Phone No
              </span>

              <PhoneInput
                country={"in"}
                value={Ph}
                onChange={setPh}
                className="mb-[16px]"
              />

              <button
                onClick={onSignup}
                className="rounded-md px-[14px] py-[8px] items-center justify-center flex bg-black bg-opacity-75 text-white text-opacity-75 w-full mb-[8px"
              >
                {loading && <CgSpinner size={20} className="animate-spin" />}{" "}
                Send code via SMS
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
