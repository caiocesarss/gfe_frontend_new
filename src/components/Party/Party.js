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
import { getList, deleteParty } from './PartyActions';
import { tableOptions} from '../../env';

const styles = defaultClass

class Party extends Component {

  componentWillMount() {
    this.props.getList();
  }

  rowDelete(selectedRows) {
    const list = this.props.list
    selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      console.log(list[dataIndex].party_id);
      this.props.deleteParty(list[dataIndex].party_id);
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
                <div>
                  <Link component={RouterLink} to={`/contasClientes/${partyId}`}>
                    <IconButton size="small" aria-label="Edit">
                      <OpenInNewIcon />
                    </IconButton>
                  </Link>
                  <Link component={RouterLink} to={`/clientes/detalhes/${partyId}`}>
                    <IconButton size="small" aria-label="Edit">
                      <OpenInNewIcon />
                    </IconButton>
                  </Link>
                </div>
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
        linkTo="/clientes/incluir"
        buttonType="primary" 
        showPageHeaderRight={true}
        />
      <Grid item xs={12}>
      <MuiThemeProvider theme={this.getMuiTheme()}>
      <MUIDataTable
        data={list}
        columns={columns}
        options={{...tableOptions, onRowsDelete: data => this.rowDelete(data)}}
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
  bindActionCreators({ getList, deleteParty}, dispatch);

Party = connect(mapStateToPropos, mapDispatchToProps)(Party)

const Comp =  withStyles(styles)(Party)
export default 
React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);