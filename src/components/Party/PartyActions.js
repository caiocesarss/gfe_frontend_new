import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { reset, initialize, change } from 'redux-form';
import { BASE_URL } from '../../env';

const INITIAL_DATA = {};

export function getList(categoria) {
    const request = axios.get(`${BASE_URL}/party/${categoria}`)
    return {
        type: 'PARTY_FETCHED',
        payload: request
    }
}

export async function setParty(values, ownProps) {
    return async dispatch => {
        const request = await axios.post(`${BASE_URL}/party`, values)
        const partyId = request.data.party_id
        toastr.success('Sucesso', 'Operação realizada com sucesso');
        //dispatch(ownProps.history.push(`/contasClientes/${partyId}`));
        return { type: 'PARTY_SAVED', payload: partyId }
    }
}

export async function setPartyAccount(values) {
    return async dispatch => {
        const request = await axios.post(`${BASE_URL}/party/setaccount`, values)
        return { type: 'PARTY_ACCOUNT_ADDED', payload: request.data }
    }
}

export async function getPartyById(id) {
    const request = await axios.get(`${BASE_URL}/party/getById/${id}`)
    return dispatch => {
        dispatch(initialize('partyForm', request.data[0]))
        return { type: 'PARTY_BY_ID_FETCHED', payload: request.data[0] }
    }

}

export async function updateParty(partyData) {
    const request = await axios.put(`${BASE_URL}/party`, partyData)
    return dispatch => {
        return { type: 'PARTY_UPDATED', payload: request.data[0] }
    }
}

export function initializeForm(data = INITIAL_DATA){
    return dispatch => {
        dispatch(initialize("partyForm", data))
    }
}

export async function deleteParty(id) {
    const request = await axios.delete(`${BASE_URL}/party/${id}`)
    return { type: 'PARTY_DELETED', payload: request.data[0] }
}

export function initPartyForm() {
    return dispatch => dispatch(reset('partyForm'));
}

