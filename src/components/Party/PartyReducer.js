const INITIAL_STATE = {
  list: [],
  newPartyId: '',
  partyById: '',
  partyAccountById: [],
  partyAccountContactsList: [],
  contactById: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PARTY_FETCHED":
      return { ...state, list: action.payload.data }
    case "PARTY_SAVED":
      return { ...state, newPartyId: action.payload }
    case "PARTY_BY_ID_FETCHED":
      return { ...state, partyById: action.payload }
    case "PARTY_ACCOUNTS_CITIES_FETCHED":
      return { ...state, partyAccountCities: action.payload }
    case "PARTY_ACCOUNT_CONTACTS_FETCHED":
      return { ...state, partyAccountContactsList: action.payload }
    case "PARTY_CONTACT_BY_ID_FETCHED":
      return { ...state, contactById: action.payload }

    default:
      return state
  }
};

