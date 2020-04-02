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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import RedoIcon from '@material-ui/icons/Redo';
import CurrencyFormat from 'react-currency-format';
import dateFormat from 'dateformat';
import ReduxToastr from 'react-redux-toastr';

import PageHeader from '../template/PageHeader';
import { defaultClass } from '../../common/Constants';
import { getReceivablesList, reSendInvoice, setInvoicePaymentInLot } from './ReceivablesActions';
import { tableOptions } from '../../env';
import Dialog from '../../common/Dialog';
import CustomToolbarSelect from '../../common/CustomToolbarSelect';


const styles = defaultClass

class Receivables extends Component {
  state = {
    openDialog: false,
    selectedRows: {}
  }
  componentWillMount() {
    this.props.getReceivablesList();
  }

  rowDelete(selectedRows) {
    this.setState({ selectedRows: selectedRows })
    this.setState({ openDialog: true })
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false })
  }

  handleDialogAccept = () => {
    this.setState({ openDialog: false })
    const selectedRows = this.state.selectedRows;
    const list = this.props.list
    selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      //this.props.deleteParty(list[dataIndex].party_id);
    })
  }

  reSendInvoice(invoiceId) {
    this.props.reSendInvoice(invoiceId);
  }

  setSome(selectedRows, dados) {
    console.log(selectedRows.data);
    console.log(dados)
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#FF000",
          fontSize: '9px'
        },
        paper: {
          boxShadow: "none",

        }
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFF",
          fontSize: '11px'
        }
      }
    }
  });

  onConfirmPayment = (selectedRows, paidValue = 0) => {
    if (paidValue <= 0) return;

    const { receivablesList, setInvoicePaymentInLot } = this.props;
    const data = receivablesList || [];
    const ids = selectedRows.data
      .map(({ dataIndex }) => data[dataIndex])
      .filter(({ payment_status }) => ['PENDENTE', 'PARCIAL'].indexOf(payment_status) >= 0)
      .map(({ invoice_id }) => invoice_id);

    setInvoicePaymentInLot(ids, paidValue);
  };

  render() {
    const { classes } = this.props;
    const { openDialog } = this.state;

    const columns = [
      {
        name: "invoice_id",
        label: "Num. Doc.",
        options: {
          filter: true,
          filterType: "textField",
          sort: true,
        }
      },
      {
        name: "sales_order_id",
        label: "OV",
        options: {
          filter: true,
          filterType: "textField",
          sort: true,
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
        name: "reference_amount",
        label: "Valor Ref",
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
        name: "cub_amount",
        label: "Valor em CUB",
        options: {
          filter: false,
          display: false,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <CurrencyFormat
                displayType={'text'}
                value={Number(value)}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={4}
                fixedDecimalScale={true}
              />
            );
          }
        }
      },
      {
        name: "city_name",
        label: "Cidade",
        options: {
          display: false
        }
      },
      {
        name: "uf",
        label: "UF",
        options: {
          display: false
        }
      },
      {
        name: "party_name",
        label: "Cliente",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            let name = value.length > 10 ? value.substring(0, 10) + '...' : value;
            return (
              name
            );
          }
        }
      },
      {
        name: "invoice_date",
        label: "Dt Emissão",
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
        name: "due_date",
        label: "Dt Vencto.",
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
        name: "invoice_type",
        label: "Tipo",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "construction_name",
        label: "Obra",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "document_type",
        label: "Tipo Doc",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "invoice_status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          display: false,
          hint: "REGISTRADO, FATURADO, CANCELADO"
        }
      },
      {
        name: "payment_status",
        label: "Status Pgto",
        options: {
          filter: true,
          sort: true,
          hint: "ABERTO, PAGO"
        }
      },
      {
        name: "payment_date",
        label: "Dt Pgto",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: 'acoes',
        label: "Ações",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const invoiceId = tableMeta.rowData ? tableMeta.rowData[0] : '';

            return (
              <>
                <Link component={RouterLink} to={`/receivables/detalhes/${invoiceId}`}>
                  <IconButton size="small" aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link component={RouterLink} to={`/receivables/registrarpgto/${invoiceId}`}>
                  <IconButton size="small" aria-label="Edit">
                    <MonetizationOnIcon />
                  </IconButton>
                </Link>

                <IconButton size="small" aria-label="Edit" onClick={() => { this.reSendInvoice(invoiceId) }}>
                  <RedoIcon />
                </IconButton>

              </>
            );
          }
        }
      },
    ];
    const data = this.props.receivablesList || [];
    const dataTableOptions = {
      ...tableOptions,
      onRowsDelete: data => this.rowDelete(data),
      customToolbarSelect: selectedRows => (
        <CustomToolbarSelect
          onConfirmPayment={paidValue => this.onConfirmPayment(selectedRows, paidValue)}
        />
      )
    }
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
          title="Contas a Receber"
          subtitle="Registros"
          linkTo="/receivables/incluir"
          buttonType="primary"
          showPageHeaderRight={true}
        />
        <Dialog title="Excluir Registro" text="Tem certeza que deseja excluir este registro?" open={openDialog} handleClose={this.handleCloseDialog} handleDialogAccept={this.handleDialogAccept} />
        <Grid item xs={12}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              data={data}
              columns={columns}
              options={dataTableOptions}
            />
          </MuiThemeProvider>
        </Grid>


      </main>
    )
  }

}

Receivables.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ receivablesList: state.receivables.receivablesList });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getReceivablesList, reSendInvoice, setInvoicePaymentInLot }, dispatch);

const retorno = connect(mapStateToPropos, mapDispatchToProps)(Receivables)

export default withStyles(styles)(retorno)
