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
import { Edit as EditIcon } from '@material-ui/icons';
import Link from '@material-ui/core/Link';


import PageHeader from '../template/PageHeader';
import { getPartyContactsList, deletePartyContact } from './PartyActions';
import { defaultClass } from '../../common/Constants';
import Dialog from '../../common/Dialog';

const styles = defaultClass

class PartyContact extends Component {
  state = {
    openDialog: false,
    selectedRows: {}
  }

  componentWillMount() {
    const { match: { params } } = this.props;
    let id;
    let type;
    if (params.party_id){
      id = params.party_id
      type = 'contactsListByParty';
    }

    if (params.party_account_id){
      id = params.party_account_id;
      type = 'contactsListByAccount';
    }
    this.props.getPartyContactsList(id, type);
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
    const list = this.props.partyAccountContactsList
    selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      this.props.deletePartyContact(list[dataIndex].contact_id);
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
    const { forwardedRef, ...props } = this.props;
    const { classes } = this.props;
    const data = this.props.partyAccountContactsList || [];
    const { match: { params } } = this.props;
    const {openDialog } = this.state;

    console.log(this.props)

    const columns = [
      {
        name: "contact_id",
        options: {
          display: false
        }
      },
      {
        name: "contact_type",
        label: "Tipo",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => { 
            if (value === 'EMAIL'){
              return 'E-mail'
            }
            if (value === 'BILLING_EMAIL') {
              return 'E-mail Cobrança'
            }
            if (value === 'PHONE') {
              return 'Telefone'
            }
            return value
          }
        }
      },
      {
        name: "contact_value",
        label: "Número/Endereço",
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
            const accountId = tableMeta.rowData ? tableMeta.rowData[0] : '';
            return (
              <Link component={RouterLink} to={`/contasPessoa/contatos/detalhes/${params.party_account_id}/${accountId}`}>
                <IconButton size="small" aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </Link>
            );
          }
        }
      },
    ];
  
    const options = {
      filterType: 'checkbox',
      responsive: 'stacked',
    };

    return (

      <main className={classes.content}>
        <PageHeader
          title="Contatos"
          subtitle="Cadastro de Contatos de Cliente"
          linkTo={`/pessoa/contatos/form/${params.party_id}/${params.party_account_id}`}
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
              options={{options, onRowsDelete: data => this.rowDelete(data)}}
            />
          </MuiThemeProvider>
        </Grid>
      </main>
    )
  }

}

PartyContact.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ 
  partyAccountContactsList: state.party.partyAccountContactsList,
  partyById: state.party.partyById
 });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPartyContactsList, deletePartyContact }, dispatch);

PartyContact = connect(mapStateToPropos, mapDispatchToProps)(PartyContact)

const Comp = withStyles(styles)(PartyContact)
export default
  React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);
