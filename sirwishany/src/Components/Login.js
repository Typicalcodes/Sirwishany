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
import {useNavigate, useLocation} from "react-router-dom";

const Login = () => {
  const navigate =useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [Ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const loginclose = bindActionCreators(openlogin, dispatch);
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
        const response = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include'
        });
        console.log(response);

        setLoading(false);

        setTimeout(() => {
          console.log("back")
          navigate(-1);
          if(location.pathname === "/login"){
            navigate("/booking")
          }
        }, 500);
        toast.success("Logged in Successfully");
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
    <div className="absolute top-0 right-0 w-full  bg-gray-200 h-screen z-50 mx-auto border">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <h2 className="mx-auto text-center mt-[64px]">Login Success </h2>
      ) : (
        <div className=" mt-[24px] relative px-[72px] flex flex-col items-center   text-center">
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
