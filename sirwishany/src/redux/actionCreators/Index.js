const changeCity=(city)=>{
    return (dispatch)=>{
        dispatch({
            type: 'change',
            payload: city
        })
    }
}
const openlogin=()=>{
    return (dispatch)=>{
        dispatch({
            type: 'openlogin',
        })
    }
}
const changeService=(services)=>{
    return (dispatch)=>{
        dispatch({
            type: 'changeservice',
            payload: services
        })
    }
}
const changeCategory=(category)=>{
    return (dispatch)=>{
        dispatch({
            type: 'changeCategory',
            payload: category
        })
    }
}

export {openlogin,changeCity,changeService,changeCategory};