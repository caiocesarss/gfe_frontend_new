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
import PhoneIcon from '@material-ui/icons/ContactPhone';
import { Edit as EditIcon } from '@material-ui/icons';
import Link from '@material-ui/core/Link';

import PageHeader from '../template/PageHeader';
import { getList } from './PartyAccountActions';
import { defaultClass } from '../../common/Constants';

const styles = defaultClass

class PartyAccount extends Component {

  componentWillMount() {
    const { match: { params } } = this.props;

    this.props.getList(params.party_id);
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
    const list = this.props.list || [];
    const { match: { params } } = this.props;
    const partyId = params.party_id;

    const columns = [
      {
        name: "party_account_id",
        options: {
          display: false
        }
      },
      {
        name: "account_alias_name",
        label: "Nome",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "city_name",
        label: "Cidade",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "uf",
        label: "UF",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "legal_account_name",
        label: "Razão Social",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "doc1_value",
        label: "CPF/CNPJ",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {

            return (
              value
            );
          }
        },
      },
      {
        name: "doc2_value",
        label: "RG/IE",
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
        name: "acoes",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const accountId = tableMeta.rowData ? tableMeta.rowData[0] : '';
            return (
              <>
              <Link component={RouterLink} to={`/contasPessoa/contatos/${partyId}/${accountId}`}>
                  <IconButton size="small" aria-label="Edit">
                    <PhoneIcon />
                  </IconButton>
                </Link>
              <Link component={RouterLink} to={`/contasPessoa/detalhes/${accountId}`}>
                <IconButton size="small" aria-label="Edit">
                  <EditIcon />
                </IconButton>
              </Link>
              </>
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

    return (

      <main className={classes.content}>
        <PageHeader
          title="Contas de Cliente"
          subtitle="Cadastro de Contas de Cliente"
          linkTo={`/contasClientes/${params.party_id}/detalhes`}
          buttonType="primary"
          showPageHeaderRight={true}
        />

        <Grid item xs={12}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Contas de Cliente"}
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

PartyAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ list: state.partyAccount.list });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList }, dispatch);

PartyAccount = connect(mapStateToPropos, mapDispatchToProps)(PartyAccount)

const Comp = withStyles(styles)(PartyAccount)
export default
  React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);
