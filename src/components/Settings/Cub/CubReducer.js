const INITIAL_STATE = {
    CubList: [],
    CubById: []
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "CUBS_FETCHED":
        return { ...state, CubList: action.payload.data }
      case "CUB_BY_ID_FETCHED":
        return { ...state, CubById: action.payload.data }
  
      default:
        return state
    }
  };
  
  