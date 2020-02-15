import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function SaveDialog({ open, toggle, ride, saveRide }) {
  const [name, setName] = useState(ride.name || '');
  const [date, setDate] = useState(ride.date || '');
  const [disabled, setDisabled] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setName(ride.name);
    setDate(ride.date);
  }, [ride]);

  const onSaveClick = () => {
    setDisabled(true);
    saveRide({
      ...ride,
      name,
      date,
    }).then(() => {
      setDisabled(false);
    });
  }

  const onClose = () => toggle(false);

  const labels = {
    name: ride.id
      ? 'Update your ride'
      : 'Save this ride'
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{minWidth: 300}}>
        Ride Details
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {labels.name}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={({ target: { value } }) => setName(value)}
          value={name}
        />
        <TextField
          margin="dense"
          id="date"
          label="Date"
          type="text"
          fullWidth
          onChange={({ target: { value } }) => setDate(value)}
          value={date}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSaveClick}
            disabled={disabled}
          >
            Save
          </Button>
          {disabled && <CircularProgress className={classes.buttonProgress} size={24} />}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SaveDialog);
