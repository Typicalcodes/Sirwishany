import React, { useState, useEffect } from "react";

const WorkerDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setProfile = async () => {
    const response = await fetch("http://localhost:3000/prof/login", {
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
    }
    setLoading(false);
    // console.log(user);
  };
  useEffect(() => {
    setProfile();
  }, []);

  return (
    <>
      <section className="bg-white pt-4 px-2">This is our WorkerDashboard</section>
      
    </>
  );
};

export default WorkerDashboard;
