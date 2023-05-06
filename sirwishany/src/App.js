import "./App.css";
import Navbar2 from "./Components/Navbar2";

import Itembox from "./Components/Items Box/Itembox";
import Login from "./Components/Login";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import itemsshow from "./Components/Item Description/itemsshow";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Footer";

function App() {
  const logn = useSelector((state) => state.loginopen);
  console.log(logn);
  return (
    <div className="relative bg-gray-100">
      <Routes>
        <Route
          path="/"
          Component={Homepage}
        />

        <Route exact path="/carpenter" Component={itemsshow} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
