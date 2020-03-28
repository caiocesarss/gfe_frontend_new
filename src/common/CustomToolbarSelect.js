import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FilterIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import { Redirect } from 'react-router-dom'

const defaultToolbarSelectStyles = {
   // iconButton: {
    //  marginRight: "24px",
    //  top: "50%",
    //  display: "inline-block",
    //  position: "relative",
    //  transform: "translateY(-50%)"
    //},
    //deleteIcon: {
    //  color: "#000"
    //}
  };

  class CustomToolbarSelect extends Component {
    handleClick = (dados) => {
       // console.log("click! current selected rows", this.props.selectedRows);
        //console.log(dados);
        //this.props.setSome(this.props.selectedRows, dados);
        const selectedRows = this.props.selectedRows;
    console.log(selectedRows)

    /*selectedRows.data.map(val => {
      const dataIndex = val.dataIndex;
      allInvoices =+ list[dataIndex].invoice_id+',';
    })*/
   return  <Redirect to='/receivables/registrarpgto/2626' />
      };

      render() {
        const { classes, dataList } = this.props;
        console.log(dataList);
        const invoiceId = 2626;
        return (
          <div className={"custom-toolbar-select"}>
            <Tooltip title={"icon 2"}>
              <IconButton className={classes.iconButton} onClick={dados => this.handleClick(dados)}>
                <FilterIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Registrar Pagamento"}>
            
              <IconButton className={classes.iconButton} onClick={this.handleClick}>
                <MonetizationOnIcon className={classes.deleteIcon} />
              </IconButton>
              
            </Tooltip>
            <Tooltip title={"Remover"}>
              <IconButton className={classes.iconButton} onClick={this.handleClick}>
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
          </div>
        );
      }
    }
    
    export default withStyles(defaultToolbarSelectStyles, {
      name: "CustomToolbarSelect"
    })(CustomToolbarSelect);
    
  