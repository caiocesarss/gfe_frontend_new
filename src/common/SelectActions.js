import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
list: []
}

export function getList() {
    const request = axios.get(`${BASE_URL}/construction`)
    return {
        type: 'FORM_SELECT_FETCHED',
        payload: request
    }
}

export function getCustomList(select, params) {
    const requestParams = {table: select, params};

    const request = axios.post(`${BASE_URL}/selectList/`, requestParams)
    return {
        type: 'FORM_SELECT_FETCHED',
        payload: request
    }
}

export function getParties(params) {
    const request = axios.post(`${BASE_URL}/party/select`, params)
    return {
        type: 'FORM_SELECT_PARTIES_FETCHED',
        payload: request
    }
}

export function getPartyAccounts(params) {
    const request = axios.post(`${BASE_URL}/party/selectaccounts`, params)
    return {
        type: 'FORM_SELECT_PARTY_ACCOUNTS_FETCHED',
        payload: request
    }
}

export function xcreate(values) {
    console.log('sisjaijsaias')
    return 
    {
        console.log('form enviado')
        console.log(values);
    }
}