const initialstate={
    services: ["Carpenter","Electrician","Mechanic","Cleaner","Cook"]
}
const changeService = (state=initialstate,action)=>{
    if (action.type==='changeservice'){
        return {...state,services:action.payload}
    }
    else {
        return state
    }
}
export default changeService;