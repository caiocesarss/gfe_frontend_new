import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import CurrencyFormat from 'react-currency-format';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

import { defaultClass } from '../../common/Constants';
import { getDetailFurthers } from './SalesOrdersActions';

const styles = defaultClass;

class SaleFurthers extends Component {

    componentDidMount() {
        this.props.getDetailFurthers(this.props.detailId);
    }

    render() {
        const { forwardedRef, classes, saleDetailFurthers, ...props } = this.props;
        let count = 1;
        console.log(saleDetailFurthers)
        return (
            <div className={classes.content} style={{margin: 10}} ref={forwardedRef}>
                <h3>Reforços Anuais</h3>
                <Table size="small" className={classes.table}><TableBody>
                    {saleDetailFurthers.map(detail => {
                        return (
                            <TableRow>
                                <TableCell><b>Reforço #{count++}:</b></TableCell>
                                <TableCell>Valor: </TableCell>
                                <TableCell>
                                    <CurrencyFormat
                                        displayType={'text'}
                                        value={detail.further_amount}
                                        fullWidth
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix={'R$ '} />
                                </TableCell>
                                <TableCell>Valor em CUB: </TableCell>
                                <TableCell>
                                    <CurrencyFormat
                                        displayType={'text'}
                                        value={detail.further_cub_amount}
                                        fullWidth
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={4} />
                                </TableCell>
                                <TableCell>Mês Vencimento: </TableCell><TableCell>{detail.due_month}</TableCell>
                                <TableCell>Dia Vencimento: </TableCell><TableCell>{detail.due_day}</TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>
                </Table>


            </div>
        )
    }
}

SaleFurthers.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({
    saleDetails: state.salesOrders.saleDetails,
    saleDetailFurthers: state.salesOrders.saleDetailFurthers
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getDetailFurthers }, dispatch);

SaleFurthers = connect(mapStateToPropos, mapDispatchToProps)(SaleFurthers)

const Comp = withStyles(styles)(SaleFurthers)
export default
    React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);