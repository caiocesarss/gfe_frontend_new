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

export function createNewConstruction(values, ownProps) {
    const request = axios.post(`${BASE_URL}/construction`, values)
    return {
        type: 'NEW_CONSTRUCTION_CREATED',
        payload: request.data
    }
}