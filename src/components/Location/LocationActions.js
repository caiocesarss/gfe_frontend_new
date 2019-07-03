import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { BASE_URL } from '../../env';


const INITIAL_VALUES = {
    cityList : [],
    UFList : []
}

export async function getUF() {
    const request = await axios.get(`${BASE_URL}/uf`)
    return {
        type: 'UF_FETCHED',
        payload: request
    }
}

export async function getCitiesByUF(ufId) {
    const request = await axios.get(`${BASE_URL}/city/${ufId}`)
    return {
        type: 'CITIES_FETCHED',
        payload: request
    }
}

