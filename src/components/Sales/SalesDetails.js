import React, {Component} from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CurrencyFormat from 'react-currency-format';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper}  from '@material-ui/core';
import dateFormat from 'dateformat'

import { defaultClass } from '../../common/Constants';
import { getSaleDetails } from './SalesOrdersActions';

const styles = defaultClass;

class SalesDetails extends Component {
    componentWillMount() {
        const { match: { params } } = this.props;
        this.props.getSaleDetails(params.order_id);
      }

    render(){
        const { forwardedRef, classes,saleDetails,  ...props } = this.props;
        const detailsArray = saleDetails.data;
        let count = 0;

        const cellDetail = val => {
            return {
                width: `${val}px`,
                padding: "7px"
            }
        } 
        return (
            <div className={classes.content} ref={forwardedRef}>
                <h1>Detalhes</h1>
                <Table size="small" className={classes.table}>
                <TableBody>
                <TableRow>
                    <TableCell>Data:</TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}>{detailsArray && dateFormat(detailsArray[0].ordered_date, "dd/mm/yyyy")}</TableCell>
                    <TableCell>Unidade: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}>{detailsArray && detailsArray[0].room_number}</TableCell>
                    <TableCell>Valor em CUB: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}>
                                                            <CurrencyFormat
                                                                displayType={'text'}
                                                                value={Number(detailsArray && detailsArray[0].cub_amount)}
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                />
                                                        </TableCell>
                <TableCell>Detalhes: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}>{detailsArray && detailsArray[0].order_details}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Obra: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}>{detailsArray && detailsArray[0].construction_name}</TableCell>
                <TableCell>Valor: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}><CurrencyFormat
                                                            displayType={'text'}
                                                            value={Number(detailsArray && detailsArray[0].amount)}
                                                            thousandSeparator="."
                                                            decimalSeparator=","
                                                            prefix={'R$ '} />
                                                </TableCell>
                <TableCell>CUB Utilizado: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}><CurrencyFormat
                                                                    displayType={'text'}
                                                                    value={Number(detailsArray && detailsArray[0].cub_ex_rate)}
                                                                    thousandSeparator="."
                                                                    decimalSeparator=","
                                                                    />
                                                        </TableCell>
                <TableCell>Detalhes do Pagamento: </TableCell><TableCell className={`${classes.table_cell_so_detail_h} ${classes.text_bold}`}>{detailsArray && detailsArray[0].payment_details}</TableCell>
                </TableRow>
                </TableBody>
                </Table>
                {detailsArray && detailsArray.map(item => {
                    count++;
                    return (
                        <Paper className={classes.paper} key={item.detail_id}>
                            <h4>#{count}</h4>
                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={cellDetail(80)}>Nome Cliente:</TableCell>
                                        <TableCell style={cellDetail(180)} className={classes.text_bold}>{item.account_alias_name} ({item.legal_account_name})</TableCell>
                                        <TableCell style={cellDetail(80)}>Cidade:</TableCell>
                                        <TableCell style={cellDetail(140)} className={classes.text_bold}>{item.city_name} - {item.uf}</TableCell>
                                        <TableCell style={cellDetail(80)}>Valor:</TableCell>
                                        <TableCell style={cellDetail(140)} className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.party_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                prefix={'R$ '} />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Valor em CUB:</TableCell>
                                        <TableCell style={cellDetail(140)} className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.cub_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Valor Entrada:</TableCell>
                                        <TableCell style={cellDetail(140)} className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.entry_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                prefix={'R$ '}
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Valor Entrada em CUB:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.entry_cub_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Valor Total Reforços:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.further_total_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                prefix={'R$ '}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={cellDetail(80)}>Valor Reforços em CUB:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.further_cub_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                               
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Valor Residual:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.amount_remaining)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                prefix={'R$ '}
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Qt Meses:</TableCell>
                                        <TableCell className={classes.text_bold}>{item.months_qt}</TableCell>
                                        <TableCell style={cellDetail(80)}>Valor Mensal:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.monthly_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                prefix={'R$ '}
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Valor Mensal em CUB:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.monthly_cub_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Qt Parcelas no Mês:</TableCell>
                                        <TableCell className={classes.text_bold}>{item.monthly_qt_parcel}</TableCell>
                                        <TableCell style={cellDetail(80)}>Valor da parcela:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.monthly_parcel_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={2}
                                                prefix={'R$ '}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={cellDetail(80)}>Valor da parcela em CUB:</TableCell>
                                        <TableCell className={classes.text_bold}>
                                            <CurrencyFormat
                                                displayType={'text'}
                                                value={Number(item.monthly_parcel_cub_amount)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={4}
                                            />
                                        </TableCell>
                                        <TableCell style={cellDetail(80)}>Dias Vencimento:</TableCell>
                                        <TableCell className={classes.text_bold}>{item.monthly_due_days}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                        /*
                        <Grid container spacing={1} key={item.detail_id}>
                            <Grid item xs={12} md={12}>
                                <h4>#{count}</h4>
                            </Grid>
                            <Grid item xs={12} md={3} >
                                {item.account_alias_name}
                            </Grid>
                        </Grid>
                        */
                    )
                })}
                
            </div>
        )
    }
}

SalesDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({
    saleDetails: state.salesOrders.saleDetails
   });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSaleDetails }, dispatch);

SalesDetails = connect(mapStateToPropos, mapDispatchToProps)(SalesDetails)

const Comp =  withStyles(styles)(SalesDetails)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);