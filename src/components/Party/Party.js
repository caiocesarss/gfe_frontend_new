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
import EditIcon from '@material-ui/icons/Edit';
import PhoneIcon from '@material-ui/icons/ContactPhone';
import Link from '@material-ui/core/Link';
import dateFormat from 'dateformat';
import ReduxToastr from 'react-redux-toastr';

import PageHeader from '../template/PageHeader';
import { defaultClass } from '../../common/Constants';
import { getList, deleteParty } from './PartyActions';
import { tableOptions } from '../../env';
import Dialog from '../../common/Dialog';

const styles = defaultClass

class Party extends Component {
  state = {
    openDialog: false,
    selectedRows: {}
  }

  componentWillMount() {
    this.props.getList(this.props.category);
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



  render() {
    const { forwardedRef, ...props } = this.props;
    const { classes } = this.props;
    const { openDialog, acceptDialog } = this.state;
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
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              value && dateFormat(value, "dd/mm/yyyy")

            );
          }
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
                <Link component={RouterLink} to={`/contasPessoa/${partyId}`}>
                  <IconButton size="small" aria-label="Edit" >
                    <OpenInNewIcon />
                  </IconButton>
                </Link>
                <Link component={RouterLink} to={`/pessoa/${this.props.category}/detalhes/${partyId}`}>
                  <IconButton size="small" aria-label="Edit">
                    <PhoneIcon />
                  </IconButton>
                </Link>
                <Link component={RouterLink} to={`/pessoa/${this.props.category}/detalhes/${partyId}`}>
                  <IconButton size="small" aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </Link>
              </div>
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
          title={this.props.title}
          subtitle={this.props.subtitle}
          linkTo={this.props.linkTo}
          buttonType="primary"
          showPageHeaderRight={true}
        />
        <Dialog title="Excluir Registro" text="Tem certeza que deseja excluir este cliente?" open={openDialog} handleClose={this.handleCloseDialog} handleDialogAccept={this.handleDialogAccept} />
        <Grid item xs={12}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              data={list}
              columns={columns}
              options={{ ...tableOptions, onRowsDelete: data => this.rowDelete(data) }}
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
  bindActionCreators({ getList, deleteParty }, dispatch);

Party = connect(mapStateToPropos, mapDispatchToProps)(Party)

const Comp = withStyles(styles)(Party)
export default
  React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);