import axios from 'axios'
import { BASE_URL } from '../../env';
import { change, initialize } from 'redux-form';

const INITIAL_VALUES = {

}

export function getList() {
    const request = axios.get(`${BASE_URL}/construction`)
    return {
        type: 'CONSTRUCTION_FETCHED',
        payload: request
    }
}

export function setConstruction(values, ownProps) {
    let method = 'post';
    if (values.construction_id){
        method = 'put';
    }
    const request = axios[method](`${BASE_URL}/construction`, values)
    return {
        type: 'CONSTRUCTION_SAVED',
        payload: request.data
    }
}

export function getConstructionById(construction_id){
    return async  dispatch => {
        const request = await  axios.get(`${BASE_URL}/construction/${construction_id}`)
        const data = request.data[0];
        dispatch(initializeForm(data))
    }  
}

export function initializeForm(data = INITIAL_VALUES){  
    return dispatch => {
        dispatch(initialize("ConstructionForm", data))
    }
}