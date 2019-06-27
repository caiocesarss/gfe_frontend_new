import axios from 'axios'
import { BASE_URL } from '../../env';

const INITIAL_VALUES = {
list: []
}

export function getList() {
    const request = axios.get(`${BASE_URL}/construction`)
    return {
        type: 'CONSTRUCTION_FETCHED',
        payload: request
    }
}