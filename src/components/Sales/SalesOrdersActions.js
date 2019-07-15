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

export async   function getSaleDetails(order_id){
    return async dispatch => {
        const request =  await  axios.get(`${BASE_URL}/salesorders/details/${order_id}`)
        dispatch ({
            type:"SALE_DETAILS_FETCHED",
            payload:  request
        } )
    }
        const request =  await  axios.get(`${BASE_URL}/salesorders/details/${order_id}`)
            return {
                type:"SALE_DETAILS_FETCHED",
                payload:  request
            } 
    
}
/*
export async function xgetSaleDetails(order_id){
    const request = await axios.get(`${BASE_URL}/salesorders/details/${order_id}`)
    return {
        type: "SALE_DETAILS_FETCHED", 
        payload: request
    }
}
*/
export function getDetailFurthers(detail_id){
    return async dispatch => { 
        const request =   axios.get(`${BASE_URL}/salesorders/detail/furthers/${detail_id}`)
        dispatch({
            type: "SALE_DETAIL_FURTHERS_FETCHED", 
            payload: request
          });
        
    }
}

export  function getSaleNext(order_id){
    return async dispatch => { 
        const request =  await axios.get(`${BASE_URL}/salesorders/salenext/${order_id}`)
        dispatch({
            type: "SALE_NEXT_FETCHED", 
            payload: request
          });
        
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
    return async dispatch => {const params = {construction_id: values.construction_id}
    const request = await axios.get(`${BASE_URL}/construction/${values.construction_id}`);
    const result = {...values, construction_name: request.data[0].name}
    
    dispatch ( {
        type: 'NEW_SALE_CREATED',
        payload: result
    }
    )
}
}

export function createNewSale(values, ownProps) { 
   return async dispatch => {
       
    const request = await axios.post(`${BASE_URL}/salesorders`,values )
      
            toastr.success('Sucesso', 'Operação realizada com sucesso');
            return  { type: 'SALE_SAVED', payload: request }
            //const id = resp.data[0] || resp.data[0].order_id
            //dispatch(ownProps.history.push(`/vendas/incluircliente/${id}`));
            //dispatch(init())
       
        
    }
}




export function createSaleParty(values, ownProps){
    return async dispatch => {
    const request = await axios.post(`${BASE_URL}/salesorders/adddetail`,values )
        return  { type: 'SALE_PARTY_ADDED' }
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

