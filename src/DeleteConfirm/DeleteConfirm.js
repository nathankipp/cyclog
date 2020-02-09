import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, deleteFn, toggleDeleteConfirm }) {

  const handleClose = () => {
    toggleDeleteConfirm(false);
  };

  const handleDelete = () => {
    deleteFn().then(handleClose);
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting a ride is permanent and irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}
          variant="contained"
          color="primary"
        >
          Keep my Ride
        </Button>
        <Button onClick={handleDelete}
          variant="contained"
          color="secondary"
        >
          Delete Forever
        </Button>
      </DialogActions>
    </Dialog>
  );
}
