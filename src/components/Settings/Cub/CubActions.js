import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { change, initialize } from 'redux-form';
import dateFormat from 'dateformat';

import { BASE_URL } from '../../../env';

const INITIAL_DATA = {}

export function getCubList() {
    const request = axios.get(`${BASE_URL}/settings/cub`)
    return {
        type: 'CUBS_FETCHED',
        payload: request
    }
}

export function getCubById(cubId){
    return async  dispatch => {
        const request = await  axios.get(`${BASE_URL}/settings/cub/${cubId}`)
        const data = request.data[0];
        dispatch(initializeForm(data))
        
    }  
}

export function setCub(values){
    const type = values.cub_id ? 'put' : 'post';
    return async dispatch => {
        const request = await axios[type](`${BASE_URL}/settings/cub`, values)
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        return { type: 'CUB_SAVED', payload: request }
    }
}

export function initializeForm(data = INITIAL_DATA){
    return dispatch => {
        dispatch(initialize("cubForm", data))
    }
}