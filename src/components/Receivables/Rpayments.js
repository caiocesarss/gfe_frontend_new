import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CurrencyFormat from 'react-currency-format';
import dateFormat from 'dateformat';
import ReduxToastr from 'react-redux-toastr';
import { change } from 'redux-form';

import PageHeader from '../template/PageHeader';
import { defaultClass } from '../../common/Constants';
import { getRpaymentsList, reSendInvoice, getInvoiceDetails, deletePayment } from './ReceivablesActions';
import { tableOptions } from '../../env';
import Dialog from '../../common/Dialog';
import PaymentForm from './PaymentForm';

const styles = defaultClass

class Rpayments extends Component {
  state = {
    openDialog: false,
    selectedRows: {},
    payList: []
  }
  componentWillMount() {
    const { match: { params } } = this.props;
    this.props.getInvoiceDetails(params.invoice_id);
    this.props.getRpaymentsList(params.invoice_id);    
  }

  rowDelete(selectedRows) {
    this.setState({ selectedRows: selectedRows })
    this.setState({ openDialog: true })
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false })
  }

  //function(rowsDeleted: object(lookup: {[dataIndex]: boolean}, data: arrayOfObjects: {index: number, dataIndex: number})) => void OR false (Returning false prevents row deletion.)

  handleDialogAccept = () => {
    this.setState({ openDialog: false })
    const selectedRows = this.state.selectedRows;
    const list = this.props.paymentsList;
    selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      this.props.deletePayment(list[dataIndex].payment_id)
    })
  }

  fillPayemtnForm(paymentId, paymentDate, paymentMethod, interestAmount, penaltyAmount, amount){
    const dataPgto = dateFormat(paymentDate, "yyyy-mm-dd")
    this.props.change('paymentForm', 'payment_id', paymentId)
    this.props.change('paymentForm', 'payment_date', dataPgto)
    this.props.change('paymentForm', 'payment_method', paymentMethod)
    this.props.change('paymentForm', 'interest_amount', interestAmount)
    this.props.change('paymentForm', 'penalty_amount', penaltyAmount)
    this.props.change('paymentForm', 'amount', amount)
  }


  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#FF000",

        },
        paper: {
          boxShadow: "none",

        }
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFF"
        }
      }
    }
  });

  render() {
    const { classes, InvoiceById } = this.props;
    const { openDialog } = this.state;
    const data = this.props.paymentsList || [];

    const columns = [
      {
        name: "payment_id",
        label: "Num. Doc.",
        options: {
          filter: true,
          filterType: "textField",
          sort: true,
        }
      },
      {
        name: "invoice_id",
        label: "Fatura",
        options: {
          filter: true,
          filterType: "textField",
          sort: true,
        }
      },
      {
        name: "payment_date",
        label: "Dt Pgto",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              value && dateFormat(value, "dd/mm/yyyy")

            );
          }
        }
      },
      {
        name: "amount",
        label: "Valor",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <CurrencyFormat
                displayType={'text'}
                value={Number(value)}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '} />
            );
          }
        }
      },
      {
        name: "interest_amount",
        label: "Juros",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <CurrencyFormat
                displayType={'text'}
                value={Number(value)}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '} />
            );
          }
        }
      },
      {
        name: "penalty_amount",
        label: "Multa",
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <CurrencyFormat
                displayType={'text'}
                value={Number(value)}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'R$ '} />
            );
          }
        }
      },
      
      {
        name: "payment_method",
        label: "Método",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        label: "Ações",
        name: "acoes",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const paymentId = tableMeta.rowData ? tableMeta.rowData[0] : '';
            const paymentDate = tableMeta.rowData ? tableMeta.rowData[2] : '';
            const paymentMethod = tableMeta.rowData ? tableMeta.rowData[6] : '';
            const interestAmount = tableMeta.rowData ? tableMeta.rowData[4] : '';
            const penaltyAmount = tableMeta.rowData ? tableMeta.rowData[5] : '';
            const amount = tableMeta.rowData ? tableMeta.rowData[3] : '';

            return (
              <>
                <Link component={RouterLink} onClick={() => { this.fillPayemtnForm(paymentId, paymentDate, paymentMethod, interestAmount, penaltyAmount, amount) }}>
                  <IconButton size="small" aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </Link>

                <IconButton size="small" aria-label="Edit" onClick={() => { this.reSendInvoice(paymentId) }}>
                  <DeleteIcon />
                </IconButton>

              </>
            );
          }
        }
      },
    ];
    

    return (

      <main className={classes.content}>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick />
        <PageHeader
          title={`Pagamentos do Título ${InvoiceById.invoice_id}, ${InvoiceById.construction_name}`}
          subtitle="Detalhes"
          linkTo="/receivables/registratpgto/incluir"
          buttonType="primary"
          showPageHeaderRight={true}
        />
        <Dialog title="Excluir Registro" text="Tem certeza que deseja excluir este registro?" open={openDialog} handleClose={this.handleCloseDialog} handleDialogAccept={this.handleDialogAccept} />

        <Grid item xs={12}>
          <Table size="small" className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>Valor:&nbsp;
                  <CurrencyFormat
                    displayType={'text'}
                    value={Number(InvoiceById.amount)}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={'R$ '} />
                </TableCell>
                <TableCell>Valor Referência:&nbsp;
                  <CurrencyFormat
                    displayType={'text'}
                    value={Number(InvoiceById.reference_amount)}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={'R$ '} />
                </TableCell>
                <TableCell>Valor em CUB:&nbsp;
                  <CurrencyFormat
                    displayType={'text'}
                    value={Number(InvoiceById.cub_amount)}
                    thousandSeparator="."
                    decimalSeparator=","
                  /></TableCell>
                <TableCell>Tipo: {InvoiceById.invoice_type}</TableCell>
                <TableCell>Status Fatura: {InvoiceById.payment_status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Data: {dateFormat(InvoiceById.invoice_date, "dd/mm/yyyy")}</TableCell>
                <TableCell>Data Referência: {dateFormat(InvoiceById.reference_date, "dd/mm/yyyy")}</TableCell>
                <TableCell>Data Vencimento: {dateFormat(InvoiceById.due_date, "dd/mm/yyyy")}</TableCell>
                <TableCell>N&deg; parcela: {InvoiceById.parcel_no}</TableCell>
                <TableCell>Obra: {InvoiceById.construction_name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
        <PaymentForm baseAmount={InvoiceById.amount} invoiceId={InvoiceById.invoice_id} history={this.props.history} paymentId={0} />
        </Grid>

        <Grid item xs={12}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              data={data}
              columns={columns}
              options={{ ...tableOptions, onRowsDelete: data => {this.rowDelete(data)} }}
            />
          </MuiThemeProvider>
        </Grid>
      </main>
    )
  }
}

Rpayments.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({
  paymentsList: state.receivables.paymentsList,
  InvoiceById: state.receivables.InvoiceById
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRpaymentsList, getInvoiceDetails, reSendInvoice, deletePayment, change }, dispatch);

const retorno = connect(mapStateToPropos, mapDispatchToProps)(Rpayments)

export default withStyles(styles)(retorno)
