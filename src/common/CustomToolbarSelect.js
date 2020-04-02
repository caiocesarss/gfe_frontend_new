import React, { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FilterIcon from "@material-ui/icons/FilterList";


const CustomToolbarSelect = ({ onConfirmPayment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);

  const onClick = () => {
    throw Error('not implemented');
  };

  const handleDialogAccept = () => {
    setIsOpen(false);
    onConfirmPayment(value);
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
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Baixar registros</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escolha o valor a ser baixado e confirme
          </DialogContentText>
          <TextField
            label="Valor da baixa"
            fullWidth
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setIsOpen(false)} color="primary" autoFocus>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleDialogAccept} color="secondary" >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomToolbarSelect;
