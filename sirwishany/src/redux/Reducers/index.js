import { combineReducers } from "redux";
import reducer from "./Reducers";
import loginreducer from "./Loginopen";
import changeService from "./changeservice";
import changeCategory from "./changeCategory";
import editnotification from "./editNotificationconter";
const reducers =combineReducers({
    place: reducer,
    loginopen: loginreducer,
    changeServices : changeService,
    changeCategory : changeCategory,
    editNotification : editnotification
})
export default reducers;