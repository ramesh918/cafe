import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function ErrorModal({ isOpen, onClose, errorMessage }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <DialogTitle id="error-modal-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="error-modal-description">
            {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default ErrorModal;

