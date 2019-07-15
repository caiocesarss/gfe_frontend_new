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
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import CurrencyFormat from 'react-currency-format';
import dateFormat from 'dateformat'

import PageHeader from '../template/PageHeader';
import { defaultClass } from '../../common/Constants';
import { getList } from './PayablesActions';
import { tableOptions} from '../../env';
import Dialog from '../../common/Dialog';

const styles = defaultClass

class Payables extends Component {
  state = {
    openDialog: false,
    selectedRows: {}
  }
  componentWillMount() {
    this.props.getList();
  }

  rowDelete(selectedRows) {
    this.setState({selectedRows:selectedRows})
    this.setState({openDialog: true})
  }

  handleCloseDialog   = () => {
    this.setState({openDialog: false})
  }

  handleDialogAccept = () => {
    this.setState({openDialog: false})
    const selectedRows = this.state.selectedRows;
    const list = this.props.list
    selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      //this.props.deleteParty(list[dataIndex].party_id);
    })
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
    const { classes } = this.props;
    const {openDialog } = this.state;

    const columns = [
      {
        name: "invoice_id",
        options: {
          display: false
        }
      },
      {
        name: "invoice_number",
        label: "Num. Doc.",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "amount",
        label: "Valor",
        options: {
          filter: true,
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
        name: "city_name",
        options: {
          display: false
        }
      },
      {
        name: "uf",
        options: {
          display: false
        }
      },
      {
        name: "party_name",
        label: "Credor",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const text = tableMeta.rowData ? `${value} - ${tableMeta.rowData[3]} - ${tableMeta.rowData[4]}` : '';
            return text;
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
        name: "payment_status",
        label: "Status Pgto",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return value == 1 ? "PAGO" : "EM ABERTO";
          }
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
        name: "major_item",
        label: "Produtos",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        label: "Ações",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const invoiceId = tableMeta.rowData ? tableMeta.rowData[0] : '';

            return (
              <Link component={RouterLink} to={`/payables/detalhes/${invoiceId}`}>
                    <IconButton size="small" aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
            );
          }
        }
      },
    ];
    const data = this.props.payablesList || [];

    return (

      <main className={classes.content}>

        <PageHeader
          title="Contas a Pagar"
          subtitle="Registros"
          linkTo="/payables/incluir"
          buttonType="primary"
          showPageHeaderRight={true}
        />
        <Dialog title="Excluir Registro" text="Tem certeza que deseja excluir este registro?" open={openDialog} handleClose={this.handleCloseDialog} handleDialogAccept={this.handleDialogAccept}/>
        <Grid item xs={12}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable

              data={data}
              columns={columns}
              options={{...tableOptions, onRowsDelete: data => this.rowDelete(data)}}
            />
          </MuiThemeProvider>
        </Grid>


      </main>
    )
  }

}

Payables.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ payablesList: state.payables.payablesList });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList }, dispatch);

const retorno = connect(mapStateToPropos, mapDispatchToProps)(Payables)

export default withStyles(styles)(retorno)
