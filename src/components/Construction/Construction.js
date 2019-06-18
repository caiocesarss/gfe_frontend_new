import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';


import { getList } from './ConstructionActions';

const styles = {
  content: {
    flexGrow: 1,
    padding: 10
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 8px",
    "margin-top": "60px"
  }
}

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
  
  render(){
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
       name: "alias_name",
       label: "Apelido",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "progress_value",
       label: "Progresso",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "room_qt",
       label: "Andares",
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
            return (
              <IconButton size="small" aria-label="Edit" onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowData[0]}`)}>
              <EditIcon />
              </IconButton>
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
      <div className={classes.toolbar}>
      
      <Grid item xs={12}>
      <MuiThemeProvider theme={this.getMuiTheme()}>
      <MUIDataTable
        title={"Obras"}
        data={data}
        columns={columns}
        options={options}
      />
      </MuiThemeProvider>
      </Grid>
   
      </div>
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

export default withStyles(styles)(retorno)
