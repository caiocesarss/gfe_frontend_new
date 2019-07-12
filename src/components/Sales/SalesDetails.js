import React, { useCallback } from 'react';

import { useSelector, useDispatch } from "react-redux";

import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper}  from '@material-ui/core';
import dateFormat from 'dateformat'

//import { defaultClass } from '../../common/Constants';
import { getSaleDetails, getDetailFurthers } from './SalesOrdersActions';
import { defaultPageStyle } from '../../common/Constants';

const useStyles = defaultPageStyle();

function getSales(order_id){
    getSaleDetails(order_id)
}

function SalesDetails(props){
    const classes = useStyles();

        const { match: { params } } = props;

        const saleDetails = useSelector(state => state.salesOrders.saleDetails)
        
        //const saleDetailFurthers = useSelector(state => state.salesOrders.saleDetailFurthers)
        const dispatch = useDispatch();
        
       
       // dispatch(getSales(params.order_id));

        useCallback(
            () => dispatch(getSales(params.order_id)),
            [dispatch]
          )
        
    
        console.log(saleDetails)

  
        return (
            <div className={classes.content}>
                <h1>Detalhes</h1>
                {
                    console.log(saleDetails && saleDetails)
                }
                
            </div>
        )
    }
export default  SalesDetails