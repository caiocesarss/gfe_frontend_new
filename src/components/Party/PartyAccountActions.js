import axios from 'axios'
import { BASE_URL } from '../../env';

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