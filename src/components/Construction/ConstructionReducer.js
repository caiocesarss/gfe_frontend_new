const INITIAL_STATE = { list: [], ConstructionById: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CONSTRUCTION_FETCHED":
      return { ...state, list: action.payload.data }
    case "CONSTRUCTION_BY_ID_FETCHED":
      return { ...state, ConstructionById: action.payload.data }
    default:
      return state
  }
};

