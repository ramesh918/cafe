import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirmDelete }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <DialogTitle id="delete-confirmation-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-dialog-description">
          Are you sure you want to delete this cafe?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          No
        </Button>
        <Button onClick={onConfirmDelete} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteConfirmationModal;



