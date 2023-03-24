
import './App.css';
import Navbar2 from './Components/Navbar2';

import Itembox from './Components/Items Box/Itembox';
import Login from './Components/Login';
import { useSelector } from "react-redux";
function App() {
  const logn = useSelector((state) => state.loginopen);
  console.log(logn)
  return (
    <div className='relative'>
     { logn && <Login /> }

      <Navbar2 />
      <Itembox/>
    </div>
  );
}

export default App;
