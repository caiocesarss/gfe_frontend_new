import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
list: []
}

export function getList() {
    const request = axios.get(`${BASE_URL}/party`)
    return {
        type: 'PARTY_FETCHED',
        payload: request
    }
}