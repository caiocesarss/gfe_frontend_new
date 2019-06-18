const INITIAL_STATE = { list: [], partyList: [], partyAccountsList: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FORM_SELECT_FETCHED":
      return { ...state, list: action.payload.data }
    case "FORM_SELECT_PARTIES_FETCHED":
      return { ...state, partyList: action.payload.data}
    case "FORM_SELECT_PARTY_ACCOUNTS_FETCHED":
      return { ...state, partyAccountsList: action.payload.data}
    default:
      return state
  }
};

