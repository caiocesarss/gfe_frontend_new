import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
list: []
}

export function getList() {
    const request = axios.get(`${BASE_URL}/payables/invoice`)
    return {
        type: 'PAYABLES_FETCHED',
        payload: request
    }
}