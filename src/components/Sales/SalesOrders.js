import React, {Component} from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import  IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Link from '@material-ui/core/Link';
import PageHeader from '../template/PageHeader';
import { defaultClass } from '../../common/Constants';

import { getList } from './SalesOrdersActions';


const styles = defaultClass

class SalesOrders extends Component {
  componentWillMount() {
    this.props.getList();
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
  
  render(){
    const { classes } = this.props;
    const list = this.props.list || [];
  
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
        name: "ammount",
        label: "Valor",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "party_id",
        label: "Credor",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "invoice_data",
        label: "Dt Vencto",
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
       name: "created_at",
       label: "Data Registro",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
        label: "Ações",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
             const partyId = tableMeta.rowData ? tableMeta.rowData[0] : '';

            return ( 
                <Link component={RouterLink} to={`/contasClientes/${partyId}`}>
                <IconButton size="small" aria-label="Edit">
                <OpenInNewIcon />
                </IconButton>
                </Link>
              /*<IconButton size="small" aria-label="Edit" onClick={() => {
                        window.alert(`Clicked "Edit" for row ${tableMeta.rowData[0]}`)
                    }
                }>
              <OpenInNewIcon />
                </IconButton>*/
            );
          }
        }
      },
     ];
     const data = list;
     const options = {
      filterType: 'checkbox',
      responsive: 'stacked',
    };
    return(
      
      <main className={classes.content}>
      
      <PageHeader 
        title="Vendas" 
        subtitle="Registros"
        linkTo="/vendas/detalhes"
        buttonType="primary" 
        showPageHeaderRight={true}
        />
      <Grid item xs={12}>
      <MuiThemeProvider theme={this.getMuiTheme()}>
      <MUIDataTable
        
        data={data}
        columns={columns}
        options={options}
      />
      </MuiThemeProvider>
      </Grid>
   
      
    </main>
    )
  }

}

SalesOrders.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ list: state.salesOrders.list });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList }, dispatch);

const retorno = connect(mapStateToPropos, mapDispatchToProps)(SalesOrders)

export default withStyles(styles)(retorno)

