import axios from 'axios'
import { BASE_URL } from '../../env';

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

export async function setParty(values) {
    return async dispatch => {
        const request = await axios.post(`${BASE_URL}/party`, values)
        dispatch(console.log(request.data))
    }
}