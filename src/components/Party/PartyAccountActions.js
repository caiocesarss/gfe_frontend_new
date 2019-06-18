import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api';
const INITIAL_VALUES = {
list: []
}

export function getList(partyId) {
    const request = axios.get(`${BASE_URL}/partyAccounts/${partyId}`)
    return {
        type: 'PARTY_ACCOUNT_FETCHED',
        payload: request
    }
}