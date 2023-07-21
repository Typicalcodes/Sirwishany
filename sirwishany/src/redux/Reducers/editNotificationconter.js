const editnotification = (state = false, action) => {
  switch (action.type) {
    case "changenotif":
      console.log("the state before changing is ", state)
      return !state;

    default:
      return state;
  }
};
export default editnotification;
