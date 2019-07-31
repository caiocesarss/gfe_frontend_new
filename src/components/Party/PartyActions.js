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
        let method = "post";
        if (values.party_account_id) {
            method = "put";
        }
        const request = await axios[method](`${BASE_URL}/partyAccounts/`, values)
        return { type: 'PARTY_ACCOUNT_SAVED', payload: request.data }
    }
}

export async function setPartyContact(values){
    return async dispatch => {
        let method = "post";
        if (values.contact_id) {
            method = "put";
        }
        const request = await axios[method](`${BASE_URL}/partyAccounts/contact`, values)
        return { type: 'PARTY_CONTACT_SAVED', payload: request.data }
    }
}

export async function getPartyById(id) {
    const request = await axios.get(`${BASE_URL}/party/getById/${id}`)
    return dispatch => {
        dispatch(initialize('partyForm', request.data[0]))
        return { type: 'PARTY_BY_ID_FETCHED', payload: request.data[0] }
    }
}

export async function getPartyAccountById(id) {
    const request = await axios.get(`${BASE_URL}/partyAccounts/getPartyAccountById/${id}`)
    return dispatch => {
        dispatch(initialize('partyAccountsForm', request.data[0]))
        dispatch( getPartyAccountCities(request.data[0].uf_id))
        dispatch( { type: 'PARTY_ACCOUNTS_BY_ID_FETCHED', payload: request.data[0] })
    }
}

export async function getPartyAccountCities (ufId){
    const request = await axios.get(`${BASE_URL}/city/${ufId}`)
    return { type: 'PARTY_ACCOUNTS_CITIES_FETCHED', payload: request }
}

export async function getPartyContactsList (id, type){
    const request = await axios.get(`${BASE_URL}/partyAccounts/${type}/${id}`)
    return {
        type: 'PARTY_ACCOUNT_CONTACTS_FETCHED',
        payload: request.data
    }
}

export async function getPartyContactById (id){
    const request = await axios.get(`${BASE_URL}/partyAccounts/getPartyContactById/${id}`)
    return dispatch => {
        dispatch(initialize('partyContactsForm', request.data))
        dispatch( { type: 'PARTY_CONTACT_BY_ID_FETCHED', payload: request.data })
    }
}

export async function updateParty(partyData) {
    const request = await axios.put(`${BASE_URL}/party`, partyData)
    return dispatch => {
        return { type: 'PARTY_UPDATED', payload: request.data[0] }
    }
}

export function initializeForm(data = INITIAL_DATA, form = "partyForm"){
    return dispatch => {
        dispatch(initialize(form, data))
    }
}

export async function deleteParty(id) {
    return async dispatch => {
        const request = await axios.delete(`${BASE_URL}/party/${id}`)
        
        if (request.data.error){
            
            toastr.error('Erro', request.data.error);
        }
        return { type: 'PARTY_DELETED', payload: request.data[0] }
    }
}

export function initPartyForm() {
    return dispatch => dispatch(reset('partyForm'));
}

