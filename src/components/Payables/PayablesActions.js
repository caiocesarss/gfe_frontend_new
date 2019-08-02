import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { change, initialize } from 'redux-form';
import dateFormat from 'dateformat';

import { BASE_URL } from '../../env';

const INITIAL_VALUES = {
    payablesList: [],
    APPartyList: [],
    APPartyAccountsList: [],
    APFinGroupsList: [],
    InvoiceById: []
}

const INITIAL_DATA = {}

export function getList() {
    const request = axios.get(`${BASE_URL}/payables/invoice`)
    return {
        type: 'PAYABLES_FETCHED',
        payload: request
    }
}

export function getInvoiceById(invoice_id){
        return async  dispatch => {
            const request = await  axios.get(`${BASE_URL}/payables/invoice/${invoice_id}`)
            const data = request.data[0];
            const paymentStatus = data.payment_status == 1 ? true :  false;
            const dataForm = {...data, 
                                invoice_date: dateFormat(data.invoice_date, "yyyy-mm-dd"),
                                due_date: dateFormat(data.due_date, "yyyy-mm-dd"),
                                payment_status: paymentStatus,
                                payment_date: dateFormat(data.payment_date, "yyyy-mm-dd")
                            }
            dispatch (getPartyAccounts({party_id: dataForm.party_id}))

            dispatch(initializeForm(dataForm))
            
        }  
}

export async function setInvoice(values) {
    const type = values.invoice_id ? 'put' : 'post';
    values.payment_status = values.payment_status == "1" || values.payment_status == true ? "1" : "0";
    return async dispatch => {
        const request = await axios[type](`${BASE_URL}/payables/invoice/setinvoice`, values)
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

export function initializeForm(data = INITIAL_DATA){
    return dispatch => {
        dispatch(initialize("payablesForm", data))
    }
}