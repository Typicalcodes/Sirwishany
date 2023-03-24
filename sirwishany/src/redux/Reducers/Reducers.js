const initialstate={
    city: "Agra",
    state: "Uttar Pradesh"


}
const reducer = (state=initialstate,action)=>{
    if (action.type==='change'){
        return {...state,city:action.payload.name,state:action.payload.state}
    }
    else {
        return state
    }
}
export default reducer;