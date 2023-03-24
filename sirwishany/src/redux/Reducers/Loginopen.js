const reducerlogin = (state=false,action)=>{
    if (action.type==='openlogin'){
        return !state
    }
    else {
        return state
    }
}
export default reducerlogin;