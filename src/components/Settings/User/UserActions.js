import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { change, initialize } from 'redux-form';
import dateFormat from 'dateformat';

import { BASE_URL } from '../../../env';

const INITIAL_DATA = {}

export function getUserList() {
    const request = axios.get(`${BASE_URL}/users`)
    return {
        type: 'USERS_FETCHED',
        payload: request
    }
}

export function getUserById(userId){
    return async  dispatch => {
        const request = await  axios.get(`${BASE_URL}/users/${userId}`)
        const data = request.data;
        dispatch(initializeForm(data))
        
    }  
}

export function deleteUser(userId){
    return async  dispatch => {
        const request = await  axios.delete(`${BASE_URL}/users/${userId}`)
        return {
            type: 'USER_DELETED',
            payload: request
        }
    }  
}

export function setUser(values){
    const type = values.user_id ? 'put' : 'post';
    return async dispatch => {
        const request = await axios[type](`${BASE_URL}/users`, values)
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        return { type: 'USER_SAVED', payload: request }
    }
}

export function initializeForm(data = INITIAL_DATA){
    return dispatch => {
        dispatch(initialize("userForm", data))
    }
}