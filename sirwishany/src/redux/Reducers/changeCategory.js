const initialstate={
    Category: {}
}
const changeCategory = (state=initialstate,action)=>{
    if (action.type==='changeCategory'){
        console.log(action.payload)
        return {...state,Category:action.payload}
    }
    else {
        return state
    }
}
export default changeCategory;