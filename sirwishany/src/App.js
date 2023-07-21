import "./App.css";
import Navbar2 from "./Components/Navbar2";

import Itembox from "./Components/Items Box/Itembox";
import Login from "./Components/Login";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import itemsshow from "./Components/Item Description/itemsshow";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer";
import Categoryadd from "./Components/Homepage/Categoryadd";
import Profile from "./Components/User/Profile";
import { useEffect } from "react";
import Bookpage from "./Components/BookingPage/Bookpage";
import Firstlogin from "./Components/ForProffesional/Firstlogin";
import WorkerDashboard from "./Components/ForProffesional/WorkerDashboard";
import NewExperiments from "./Components/NewExperiments";
import NewExperiments2 from "./Components/NewExperimentscopy";
import Exper from "./Components/Exper";
import Chatbox from "./Components/Chatbox/Chatbox";
function App() {
  
  
  return (
    <div className=" bg-gray-100">
      <Routes>
        <Route
          path="/"
          Component={Homepage}
        />

        <Route exact path="/itemshow" Component={itemsshow} />
        <Route exact path="/addCat" Component={Categoryadd} />
        <Route exact path="/profile" Component={Profile} />
        <Route exact path="/booking" Component={Bookpage} />
        <Route exact path="/login" Component={Login}/>
        <Route exact path="/firstlogin" Component={Firstlogin}/>
        <Route exact path="/profdashboard" Component={WorkerDashboard}/>
        <Route exact path="/newexper" Component={NewExperiments}/>
        <Route exact path="/newexper2" Component={NewExperiments2}/>        
        <Route exact path="/exper" Component={Exper}/>        
        <Route exact path="/chat" Component={Chatbox}/>        
        </Routes>
      
    </div>
  );
}

export default App;
