const INITIAL_STATE = { 
  list: [],
  salePartyList: [],
  salePartyAccountList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SALES_ORDERS_FETCHED":
      return { ...state, list: action.payload.data }
    case "SALE_PARTIES_FETCHED":
      return {...state, salePartyList: action.payload.data }
    case "SALE_PARTY_ACCOUNTS_FETCHED":
      return {...state, salePartyAccountList: action.payload.data }
    default:
      return state
  }
};

