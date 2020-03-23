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

import PageHeader from '../../template/PageHeader';
import { defaultClass } from '../../../common/Constants';
import { getUserList, deleteUser} from './UserActions';
import { tableOptions} from '../../../env';
import Dialog from '../../../common/Dialog';

const styles = defaultClass

class User extends Component {
  state = {
    openDialog: false,
    selectedRows: {}
  }
  componentWillMount() {
    this.props.getUserList();
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
    const list = this.props.UserList
    selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      this.props.deleteUser(list[dataIndex].user_id);
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
        name: "user_id",
        options: {
          display: false
        }
      },
      {
        name: "person_name",
        label: "Nome",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "email",
        label: "E-mail",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "username",
        label: "Username/Login",
        options: {
          filter: true,
          sort: true
          
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
            const invoiceId = tableMeta.rowData ? tableMeta.rowData[0] : '';

            return (
              <Link component={RouterLink} to={`usuario/detalhes/${invoiceId}`}>
                    <IconButton size="small" aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
            );
          }
        }
      },
    ];
    const data = this.props.UserList || [];

    return (

      <main className={classes.content}>

        <PageHeader
          title="User"
          subtitle="Registros"
          linkTo="/settings/usuario/detalhes"
          buttonType="primary"
          showPageHeaderRight={true}
        />
        <Dialog 
          title="Excluir Registro" 
          text="Tem certeza que deseja excluir este registro?" 
          open={openDialog} 
          handleClose={this.handleCloseDialog} 
          handleDialogAccept={this.handleDialogAccept}/>
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

User.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ UserList: state.user.UserList });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserList, deleteUser }, dispatch);

const retorno = connect(mapStateToPropos, mapDispatchToProps)(User)

export default withStyles(styles)(retorno)
