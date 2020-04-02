import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FilterIcon from "@material-ui/icons/FilterList";

import Dialog from '../common/Dialog';

const CustomToolbarSelect = ({ onConfirmPayment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    throw Error('not implemented');
  };

  const handleDialogAccept = () => {
    setIsOpen(false);
    onConfirmPayment();
  };

  return (
    <div className="custom-toolbar-select">
      <Tooltip title="icon 2">
        <IconButton onClick={onClick}>
          <FilterIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Registrar Pagamento">
        <IconButton onClick={() => setIsOpen(true)}>
          <MonetizationOnIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Remover">
        <IconButton onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        title="Baixar registros"
        text="Tem certeza que deseja realizar a baixa dos pagamentos selecionados?"
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        handleDialogAccept={handleDialogAccept}
      />
    </div>
  );
};

export default CustomToolbarSelect;
