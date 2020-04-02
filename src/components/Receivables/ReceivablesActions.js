import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { change, initialize } from 'redux-form';
import dateFormat from 'dateformat';

import { BASE_URL } from '../../env';

const INITIAL_DATA = {}

export function getReceivablesList() {
    const request = axios.get(`${BASE_URL}/receivables/invoice`)
    return {
        type: 'RECEIVABLES_FETCHED',
        payload: request
    }
}

export function getRpaymentsList(invoice_id) {
    return async  dispatch => {
        const request = await axios.get(`${BASE_URL}/receivables/invoice/payments/${invoice_id}`)
        dispatch( {
            type: 'PAYMENTS_BY_INVOICE_FETCHED',
            payload: request.data
        })
    }
}

export async function deletePayment(paymentId) {
    return async dispatch => {
        const request = await axios.delete(`${BASE_URL}/receivables/payment/${paymentId}`)
        
        if (request.data.error){
            
            toastr.error('Erro', request.data.error);
        }
        //return { type: 'PAYMENT_DELETED', payload: request.data[0] }
    }
}

export function getInvoiceDetails(invoice_id) {
    return async  dispatch => {
        const request = await axios.get(`${BASE_URL}/receivables/invoice/${invoice_id}`)

        const data = request.data[0];
        const paymentStatus = data.payment_status == 1 ? true : false;
        const dataForm = {
            ...data,
            invoice_date: dateFormat(data.invoice_date, "yyyy-mm-dd"),
            due_date: dateFormat(data.due_date, "yyyy-mm-dd"),
            payment_status: paymentStatus
        }
        dispatch({
            type: 'INVOICE_BY_ID_FETCHED',
            payload: dataForm
        })
    }
}

export function setInvoicePayment(values) {
    const type = values.payment_id ? 'put' : 'post';
    return async dispatch => {
        const request = await axios[type](`${BASE_URL}/receivables/invoice/setinvoicepayment`, values)
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        return { type: 'INVOICE_SAVED', payload: request }
    }
}

export const setInvoicePaymentInLot = (ids, amount) => async dispatch => {
  const request = await axios
    .post(`${BASE_URL}/receivables/invoice/setinvoicepaymentinlot`, {
      ids,
      amount
    })
  toastr.success('Sucesso', 'Operação realizada com sucesso');
  return dispatch({ type: 'INVOICE_SAVED', payload: request })
}

export function getInvoiceById(invoice_id) {
    return async  dispatch => {
        const request = await axios.get(`${BASE_URL}/receivables/invoice/${invoice_id}`)
        const data = request.data[0];
        const paymentStatus = data.payment_status == 1 ? true : false;
        const dataForm = {
            ...data,
            invoice_date: dateFormat(data.invoice_date, "yyyy-mm-dd"),
            due_date: dateFormat(data.due_date, "yyyy-mm-dd"),
            payment_status: paymentStatus
        }
        dispatch(initializeForm(dataForm))
    }
}

export function reSendInvoice(invoice_id) {
    return async  dispatch => {
        const request = await axios.get(`${BASE_URL}/receivables/arprocess/${invoice_id}`)
        const data = request.data[0];
        if (request && request.status == 200) {
            toastr.success('Email enviado com sucesso');
        }
        dispatch({ type: 'BILL_SENT' })
    }
}

export async function setInvoice(values) {
    const type = values.invoice_id ? 'put' : 'post';

    return async dispatch => {
        const request = await axios[type](`${BASE_URL}/receivables/invoice/setinvoice`, values)
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        return { type: 'INVOICE_SAVED', payload: request }
    }
}

export function initializeForm(data = INITIAL_DATA) {
    return dispatch => {
        dispatch(initialize("ARForm", data))
    }
}





