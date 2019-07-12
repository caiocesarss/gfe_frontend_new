const INITIAL_STATE = {
  payablesList: [],
  APPartyList: [],
  APPartyAccountsList: [],
  APDocumentTypesList: [],
  APFinGroupsList: [],
  InvoiceById: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PAYABLES_FETCHED":
      return { ...state, payablesList: action.payload.data }
    case "AP_PARTIES_FETCHED":
      return { ...state, APPartyList: action.payload.data }
    case "AP_PARTY_ACCOUNTS_FETCHED":
      return { ...state, APPartyAccountsList: action.payload.data }
    case "AP_DOCUMENT_TYPES_FETCHED":
      return { ...state, APDocumentTypesList: action.payload.data }
    case "AP_GROUPS_FETCHED":
      return { ...state, APFinGroupsList: action.payload.data }
    case "INVOICE_BY_ID_FETCHED":
      return { ...state, InvoiceById: action.payload.data }

    default:
      return state
  }
};

