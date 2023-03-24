import { combineReducers } from "redux";
import reducer from "./Reducers";
import loginreducer from "./Loginopen";
import changeService from "./changeservice";
const reducers =combineReducers({
    place: reducer,
    loginopen: loginreducer,
    changeServices : changeService
})
export default reducers;