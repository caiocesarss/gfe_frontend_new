import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { BASE_URL } from '../../env';


export function getList() {
    const request = axios.get(`${BASE_URL}/party`)
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
    const request = await axios.get(`${BASE_URL}/party/${id}`)
    return { type: 'PARTY_BY_ID_FETCHED', payload: request.data[0] }

}

export async function deleteParty(id){
    const request = await axios.delete(`${BASE_URL}/party/${id}`)
    return { type: 'PARTY_DELETED', payload: request.data[0] }
}

export function initPartyForm() {
    return dispatch => dispatch(reset('partyForm'));
}