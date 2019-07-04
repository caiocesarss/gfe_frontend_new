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
import { getList } from './PartyActions';
import { tableOptions} from '../../env';

const styles = defaultClass

class Party extends Component {

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
        name: "party_id",
        options: {
         display: false
        }
       },
      {
       name: "name",
       label: "Nome",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "type",
       label: "Tipo",
       options: {
        filter: true,
        sort: false,
           
       },
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
            );
          }
        }
      },
     ];


    
    return(
      
      <main className={classes.content}>
      
      <PageHeader 
        title="Clientes" 
        subtitle="Cadastro de Clientes"
        linkTo="/clientes/detalhes"
        buttonType="primary" 
        showPageHeaderRight={true}
        />
      <Grid item xs={12}>
      <MuiThemeProvider theme={this.getMuiTheme()}>
      <MUIDataTable
        
        data={list}
        columns={columns}
        options={tableOptions}
      />
      </MuiThemeProvider>
      </Grid>
   
      
    </main>
    )
  }

}

Party.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ list: state.party.list });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList}, dispatch);

Party = connect(mapStateToPropos, mapDispatchToProps)(Party)

const Comp =  withStyles(styles)(Party)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);