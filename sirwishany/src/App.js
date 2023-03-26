import "./App.css";
import Navbar2 from "./Components/Navbar2";
import img from "../src/Plumber.png";
import Itembox from "./Components/Items Box/Itembox";
import Login from "./Components/Login";
import { useSelector } from "react-redux";
function App() {
  const logn = useSelector((state) => state.loginopen);
  console.log(logn);
  return (
    <div className="relative bg-gray-100 ">
      {logn && <Login />}

      <Navbar2 />
      <Itembox />
      <div className="container relative ">
        <img src={img} className="rounded-xl absolute w-auto px-[8px]  object-fit items-center justify-center" alt="" />
      <span className="absolute top-2 right-6 font-merri font-bold text-xl text-white ">Professionals  <br/> Plumbers</span>
      </div>
    </div>
  );
}

export default App;
