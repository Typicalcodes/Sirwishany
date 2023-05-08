const initialstate={
    Category: "Nothing Selected",
    Includes: ["Go back","Select Category"]
}
const reducer = (state=initialstate,action)=>{
    if (action.type==='changeCategory'){
        return {...state,Category:action.payload.name,Includes: action.payload.Includes }
    }
    else {
        return state
    }
}
export default reducer;