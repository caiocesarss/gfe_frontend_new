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
import CurrencyFormat from 'react-currency-format';
import dateFormat from 'dateformat'

import PageHeader from '../template/PageHeader';
import { defaultClass } from '../../common/Constants';
import { getList } from './SalesOrdersActions';
import { tableOptions} from '../../env';

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
    const { forwardedRef, ...props } = this.props;
    const { classes } = this.props;
    const list = this.props.list || [];
  
    const columns = [
      {
        name: "order_id",
        options: {
         display: false
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
        name: "room_number",
        label: "Unidade",
        options: {
         filter: true,
         sort: true,
        }
      },
      {
       name: "ordered_date",
       label: "Data",
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
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return ( 
              <CurrencyFormat
                  displayType={'text'}
                  value={Number(value)}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={'R$ '} />
            );
          }
        }
       },
       {
        name: "cub_amount",
        label: "Valor em CUB",
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
              />
            );
          }
        }
       },
       {
        name: "cub_ex_rate",
        label: "CUB Utilizado",
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
                  prefix={'R$ '}
              />
            );
          }
        }
       },
       {
        name: "party",
        label: "Cliente(s)",
        options: {
         filter: true,
         sort: true,
        }
       },
       
      {
        label: "Ações",
        name: "acoes",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
             const orderId = tableMeta.rowData ? tableMeta.rowData[0] : '';

            return ( 
                <Link component={RouterLink} to={`/vendas/detalhesvenda/${orderId}`}>
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
        options={tableOptions}
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

const Comp = withStyles(styles)(retorno)

export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);