const INITIAL_STATE = {
    UserList: [],
    UserById: []
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "USERS_FETCHED":
        return { ...state, UserList: action.payload.data }
      case "USER_BY_ID_FETCHED":
        return { ...state, UserById: action.payload.data }
  
      default:
        return state
    }
  };
  
  