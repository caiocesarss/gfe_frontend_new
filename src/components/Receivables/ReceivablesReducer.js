const INITIAL_STATE = {
  receivablesList: [],
  paymentsList: [],
  InvoiceById: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RECEIVABLES_FETCHED":
      return { ...state, receivablesList: action.payload.data }
    case "INVOICE_BY_ID_FETCHED":
      return { ...state, InvoiceById: action.payload }
    case "PAYMENTS_BY_INVOICE_FETCHED":
      return { ...state, paymentsList: action.payload }
    default:
      return state
  }
};

