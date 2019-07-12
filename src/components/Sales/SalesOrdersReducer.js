const INITIAL_STATE = {
  list: [],
  salePartyList: [],
  salePartyAccountList: [],
  saleData: [],
  saleDetails: [],
  saleDetailFurthers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SALES_ORDERS_FETCHED":
      return { ...state, list: action.payload.data }
    case "SALE_PARTIES_FETCHED":
      return { ...state, salePartyList: action.payload.data }
    case "SALE_PARTY_ACCOUNTS_FETCHED":
      return { ...state, salePartyAccountList: action.payload.data }
    case "NEW_SALE_CREATED":
      return { ...state, saleData: action.payload }
    case "SALE_DETAILS_FETCHED":
      return { ...state, saleDetails: action.payload.data }
    case "SALE_DETAIL_FURTHERS_FETCHED":
      return { ...state, saleDetailFurthers: action.payload }
    default:
      return state
  }
};

