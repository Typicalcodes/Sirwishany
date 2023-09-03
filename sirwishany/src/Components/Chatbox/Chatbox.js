import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sendicon } from "../Item Description/svgimports";
const Chatbox = () => {
  let [searchParams] = useSearchParams();
  let userid = searchParams.get("userid");
  let chatid = searchParams.get("chatid");
  const [user, setUser] = useState(null);
  //NOTE - Function for setting chats
  const [chatData, setChatData] = useState(null);
  const setchats = async () => {
    console.log(chatid, userid);
    const response = await fetch(
      `http://localhost:3000/chat/fetchchat/${chatid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json) {
      setChatData(json);
      setUser(userid);
    }
    console.log(json.message.chatdetail);
  };
  useEffect(() => {
    setchats();
  }, []);
  const today = new Date("2023-07-22 ");
  const tomorrow = new Date("2023-07-23");
  const tomorday = new Date("2023-07-25");
  const [chatarray, setChatarray] = useState([
    {
      chatuser: "user1",
      message: "your budyu ",
      time: "2023-07-23T06:24:26.949Z",
    },
    {
      chatuser: "user2",
      message: "what is best ",
      time: "2023-07-23T06:28:26.949Z",
    },
    {
      chatuser: "user1",
      message: "i am the best",
      time: "2023-07-23T06:28:42.949Z",
    },
    {
      chatuser: "user2",
      message: "NO you are in mirage ",
      time: "2023-07-24T03:28:26.949Z",
    },
    {
      chatuser: "user1",
      message: "i am right birlliant",
      time: "2023-07-24T03:42:26.949Z",
    },
    {
      chatuser: "user1",
      message: "i am above you",
      time: "2023-07-25T04:28:26.949Z",
    },
    {
      chatuser: "user2",
      message: "NO you are in mirage ",
      time: "2023-07-25T10:28:26.949Z",
    },
    {
      chatuser: "user1",
      message: "i am right ",
      time: "2023-07-25T11:28:26.949Z",
    },
    {
      chatuser: "user1",
      message: "i am above you",
      time: "2023-12-30T01:28:26.949Z",
    },
  ]);

  //NOTE - Function for sending chats

  const [chat, setChat] = useState(null);
  const sendchat = async () => {
    if (chat < 1) {
      return;
    }
    const data = {
      message: chat,
      chatuser:
        userid === chatData.message.prof
          ? chatData.message.customer
          : chatData.message.prof,
    };
    console.log(data);
    const response = await fetch(
      `http://localhost:3000/chat/sendchat/${chatid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log(json);
  };
  const datefinder = () => {
    let todate = new Date(Date.now());
    console.log(typeof todate);
    const twodates = todate.toISOString(Date.now());
    const localTimezoneOffset = today.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const localDate = new Date(today.getTime() - localTimezoneOffset);
    const isoFormattedDate = localDate.toISOString();
    console.log(isoFormattedDate);
    const isoDateString = "2023-07-23T12:28:26.949Z";
    const utcDate = new Date(isoDateString);
    console.log(utcDate);
  };
  const utcDate = new Date(chatarray[0].time);
  const day = utcDate.getUTCDate();
  const month = utcDate.getUTCMonth();
  const year = utcDate.getUTCFullYear();
  let noDate = new Date(`${year}-${month}-${day - 1}`);
  const [firstDate, setFirstDate] = useState(noDate);

  //Note : colors main #6B84DD
  return (
    <>
      <section className="px-2 bg-white">
     

        {chatData && chatData.message.chatdetail.map((item, index) => {
        let counter = 1
        const utcDate = new Date(item.chattime);
        const day = utcDate.getUTCDate();
        const month = utcDate.getUTCMonth();
        const year = utcDate.getUTCFullYear();
        const newDate = new Date(`${year}-${month+1}-${day}`);
        console.log(day, " ",month, " ", year)
        counter = newDate > noDate ? 1: 0
        noDate = newDate > noDate ? newDate : noDate
        return (

          <div key={index} className=" bg-white ">
          {counter===1 && <header className="self-center drop-shadow-lg shadow-gray-700 text-center align-middle my-4 text-gray-800 font-semibold ">{newDate.toDateString()}</header>}
            <section
              className={`${
                item.chatuser === "user1" ? "text-right" : "text-left"
              } w-full my-4`}
            >
              <span className="px-1 py-1 border-2 rounded-md border-[#6B84DD] my-1">{item.message}</span>
            </section>
          </div>
        )
        ;
      })}
        <section className="flex px-2 mx-2 fixed bottom-1 right-1  left-1 justify-center items-center">
          <input
            type="text"
            onChange={(event) => {
              setChat(event.target.value);
            }}
            className=" rounded-3xl pl-4 text-base w-ful font-semibold p-2 border-4 border-[#6B84DD]   "
          />
          <button
            onClick={() => {
              sendchat();
            }}
            className=" border-2 mx-2 rounded-3xl p-1 bg-[#6B84DD] text-white"
          >
            <Sendicon />
          </button>
        </section>
      </section>
    </>
  );
};

export default Chatbox;
