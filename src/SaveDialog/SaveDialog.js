import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import nathan from '../static/nathan.png';
import sarah from '../static/sarah.jpeg';
import jesse from '../static/jesse.jpeg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  avatars: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  avatar: {
    cursor: 'pointer',
    margin: theme.spacing(2),
  },
  inactive: {
    opacity: .25,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const getDefaultRiders = riders => (riders && riders.split(',')) || [];

function SaveDialog({ open, toggle, ride, saveRide }) {
  const [name, setName] = useState(ride.name || '');
  const [riders, setRiders] = useState(getDefaultRiders(ride.riders));
  const [date, setDate] = useState(ride.date || '');
  const [disabled, setDisabled] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setRiders(getDefaultRiders(ride.riders));
    setName(ride.name);
    setDate(ride.date);
  }, [ride]);

  const addRider = name => setRiders([...riders, name]);
  const removeRider = name => setRiders(riders.filter(n => n !== name));

  const onSaveClick = () => {
    setDisabled(true);
    const r = riders.sort((a,b) => a[1].localeCompare(b[1])).join(',') || undefined;
    saveRide({
      ...ride,
      riders: r,
      name,
      date,
    }).finally(() => {
      setDisabled(false);
    });
  }

  const onClose = () => toggle(false);

  const labels = {
    name: ride.id
      ? 'Update this ride'
      : 'Save your ride'
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
        <div className={classes.avatars}>
          {[nathan,sarah,jesse].map(avatar => {
            const name = avatar.replace(/^.*\/(\w+)..*$/, "$1");
            const inactive = !riders.includes(name);
            return (
              <Avatar
                key={name}
                className={clsx(classes.avatar, inactive && classes.inactive)}
                src={avatar}
                onClick={() => {
                  if (inactive) addRider(name); else removeRider(name);
                }}
              />
            );
          })}
        </div>
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
