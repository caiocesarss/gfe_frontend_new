import axios from 'axios'
import { toastr } from 'react-redux-toastr';

const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
    payablesList: [],
    APPartyList: [],
    APPartyAccountsList: [],
    APFinGroupsList: []
}

export function getList() {
    const request = axios.get(`${BASE_URL}/payables/invoice`)
    return {
        type: 'PAYABLES_FETCHED',
        payload: request
    }
}

export function getInvoiceById(invoice_id){
    
        const request =  axios.get(`${BASE_URL}/payables/invoice/${invoice_id}`)
        return {type: 'INVOICE_BY_ID_FETCHED', payload: request}
    
}

export async function setInvoice(values, ownProps) {
    return async dispatch => {
        const request = await axios.post(`${BASE_URL}/payables/invoice/setinvoice`, values)
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        return { type: 'INVOICE_SAVED', payload: request }
    }
}

export function getParties(params) {
    return dispatch => {
        const request = axios.post(`${BASE_URL}/party/select`, params)
        dispatch({
            type: 'AP_PARTIES_FETCHED',
            payload: request
        })
    }
}

export function getPartyAccounts(params) {
    return async  dispatch => {
        const request = await axios.post(`${BASE_URL}/party/selectaccounts`, params)
        dispatch({
            type: 'AP_PARTY_ACCOUNTS_FETCHED',
            payload: request
        })
    }
}

export function getDocumentTypes(){
    const request = axios.get(`${BASE_URL}/common/documentTypes`)
    return {
        type: 'AP_DOCUMENT_TYPES_FETCHED',
        payload: request
    }
}

export function getFinGroups(){
    const request = axios.get(`${BASE_URL}/common/finGroups`)
    return {
        type: 'AP_GROUPS_FETCHED',
        payload: request
    }
}