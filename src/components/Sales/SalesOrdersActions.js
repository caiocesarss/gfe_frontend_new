import React from 'react'
import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';


const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
list: [],
construction: '',
room_number: '',
amount: '',
cub: '',
doc2_value: '',
salePartyList: [],
salePartyAccountList: []
}

export function getList() {
    const request = axios.get(`${BASE_URL}/salesorders`)
    return {
        type: 'SALES_ORDERS_FETCHED',
        payload: request
    }
}

export function getParties(params) {
    const request = axios.post(`${BASE_URL}/party/select`, params)
    return {
        type: 'SALE_PARTIES_FETCHED',
        payload: request
    }
}

export function getPartyAccounts(params) {
    const request = axios.post(`${BASE_URL}/party/selectaccounts`, params)
    return {
        type: 'SALE_PARTY_ACCOUNTS_FETCHED',
        payload: request
    }
}

export function createNewSale(values, ownProps) { 
   return async dispatch => {
    const request = await axios.post(`${BASE_URL}/salesorders`,values )
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso')
            ownProps.history.push('/vendas/incluircliente')
            //dispatch(init())
        })
        .catch (e => {
            console.log(e)
            //e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    }
}

export function createSaleParty(values, ownProps){
    return console.log(values)
}

function submit (values, method) {
   
    return dispatch => {
        const id = values._id ? values._id : ''
        const request = axios[method](`${BASE_URL}/salesorders/${id}`,values )
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso')
                dispatch(init())
            })
            .catch (e => {
                console.log(e)
                //e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
        }
}


export function init(){
    return [
        initialize('SalesForm', INITIAL_VALUES)
    ]
}

