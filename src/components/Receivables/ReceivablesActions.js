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

export function getInvoiceById(invoice_id){
        return async  dispatch => {
            const request = await  axios.get(`${BASE_URL}/receivables/invoice/${invoice_id}`)
            const data = request.data[0];
            const paymentStatus = data.payment_status == 1 ? true :  false;
            const dataForm = {...data, 
                                invoice_date: dateFormat(data.invoice_date, "yyyy-mm-dd"),
                                due_date: dateFormat(data.due_date, "yyyy-mm-dd"),
                                payment_status: paymentStatus
                            }
            dispatch(initializeForm(dataForm))
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

export function initializeForm(data = INITIAL_DATA){
    return dispatch => {
        dispatch(initialize("ARForm", data))
    }
}





