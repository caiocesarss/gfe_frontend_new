const INITIAL_STATE = { list: [], newPartyId: '', partyById:'' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PARTY_FETCHED":
      return { ...state, list: action.payload.data }
    case "PARTY_SAVED":
      return { ...state, newPartyId: action.payload }
    case "PARTY_BY_ID_FETCHED":
      return { ...state, partyById: action.payload }
    default:
      return state
  }
};

