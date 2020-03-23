import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getList } from './ConstructionActions';
import { defaultClass } from '../../common/Constants';
import PageHeader from '../template/PageHeader';
import { tableOptions } from '../../env';

const styles = defaultClass

class Construction extends Component {
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

  render() {
    const { forwardedRef, ...props } = this.props;
    const { classes } = this.props;
    const list = this.props.list || [];

    const columns = [
      {
        name: "construction_id",
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
        name: "progress_value",
        label: "Progresso",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <LinearProgress variant="determinate" value={value} />
            );
          }
        }
      },
      {
        name: "room_qt",
        label: "Unidades",
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
            const detailId = tableMeta.rowData && tableMeta.rowData[0];
            return (
              <Link component={RouterLink} to={`/obras/detalhes/${detailId}`}>
                <IconButton size="small" aria-label="Edit" >
                  <EditIcon />
                </IconButton>
              </Link>
            );
          }
        }
      },
    ];

    return (

      <main className={classes.content}>
        <PageHeader
          title="Obras"
          subtitle="Registros"
          linkTo="/obras/detalhes"
          buttonType="primary"
          showPageHeaderRight={true}
        />

        <Grid item xs={12}>

          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Obras"}
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

Construction.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToPropos = state => ({ list: state.construction.list });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getList }, dispatch);

const retorno = connect(mapStateToPropos, mapDispatchToProps)(Construction)
const Comp = withStyles(styles)(retorno)
export default
  React.forwardRef((props, ref) => <Comp {...props} forwardedRef={ref} />);
