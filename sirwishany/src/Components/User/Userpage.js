import React, { useEffect, useState } from "react";

const Userpage = () => {
  const [user, setUser] = useState(null);
  useEffect (()=>{
     const data = localStorage.getItem("login");
     if (data){
      setUser(data)
     }
  },[])
  return <div>I am a user{user}</div>;
};

export default Userpage;
