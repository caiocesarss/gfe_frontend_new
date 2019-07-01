import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { BASE_URL } from '../../env';


const INITIAL_VALUES = {
list: [],
construction: '',
room_number: '',
amount: '',
cub: '',
doc2_value: '',
salePartyList: [],
salePartyAccountList: []
}

export async function getList() {
    const request = await axios.get(`${BASE_URL}/salesorders`)
    return {
        type: 'SALES_ORDERS_FETCHED',
        payload: request
    }
}

export async function getSaleDetails(order_id){
    const request = await axios.get(`${BASE_URL}/salesorders/details/${order_id}`)
    return {
        type: "SALE_DETAILS_FETCHED", 
        payload: request
    }
}

export function getParties(params) {
    const request = axios.post(`${BASE_URL}/party/select`, params)
    return {
        type: 'SALE_PARTIES_FETCHED',
        payload: request
    }
}

export function getPartyAccounts(params) {
    const request = axios.post(`${BASE_URL}/party/selectaccounts`, params)
    return {
        type: 'SALE_PARTY_ACCOUNTS_FETCHED',
        payload: request
    }
}

export async function createNewSaleInit(values){
    const params = {construction_id: values.construction_id}
    const request = await axios.get(`${BASE_URL}/construction/${values.construction_id}`);
    const result = {...values, construction_name: request.data[0].name}
    
    return {
        type: 'NEW_SALE_CREATED',
        payload: result
    }
}

export function createNewSale(values, ownProps) { 
   return async dispatch => {
       dispatch(saleCreated())
    const request = await axios.post(`${BASE_URL}/salesorders`,values )
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso');
            dispatch(ownProps.history.push(`/vendas/incluircliente/${resp.data[0].order_id}`));
            //dispatch(init())
        })
        .catch (e => {
            console.log(e)
            //e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    }
}

export function createSaleParty(values, ownProps){
    return async dispatch => {
    
    const request = await axios.post(`${BASE_URL}/salesorders/adddetail`,values )
        .then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso')
          
            dispatch (ownProps.history.push('/vendas/detalhesvenda/'+resp.data))
            //dispatch(init())
        })
        .catch (e => {
            console.log(e)
            //e.response.data.errors.forEach(error => toastr.error('Erro', error))
        })
    }
}

function submit (values, method) {
   
    return dispatch => {
        const id = values._id ? values._id : ''
        const request = axios[method](`${BASE_URL}/salesorders/${id}`,values )
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso')
                dispatch(init())
            })
            .catch (e => {
                console.log(e)
                //e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
        }
}


export function init(){
    return [
        initialize('SalesForm', INITIAL_VALUES)
    ]
}

const saleCreated = () => ({
    type: "SALE_CREATED"
})

