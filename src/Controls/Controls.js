import React from 'react';
import uuid from 'uuid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Undo from '@material-ui/icons/Undo';
import Save from '@material-ui/icons/Save';
import DeleteForever from '@material-ui/icons/DeleteForever';
import SaveDialog from '../SaveDialog';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: '50%',
    transform: 'translateX(50%)',
    width: 200,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(1),
    '&:last-child': { paddingBottom: theme.spacing(1) },
  },
  undo: { color: '#323296' },
  save: { color: '#329632' },
  delete: { color: '#963232' },
}));

export default function Controls({open, setOpen, viewport, path, setPath, newRide, saveRide}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleClickSaveIcon = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSave = name => {
    const ride = {
      ...newRide,
      id: newRide.id || uuid(),
      name
    };
    saveRide(ride).then(() => {
      setOpen(false);
    });
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <IconButton
            aria-label="undo"
            className={classes.undo}
            onClick={() => setPath(path.slice(0, -1))}
          >
            <Undo />
          </IconButton>
          <IconButton
            aria-label="save"
            className={classes.save}
            onClick={handleClickSaveIcon}
          >
            <Save />
          </IconButton>
          <IconButton
            aria-label="trash"
            className={classes.delete}
            onClick={() => {
              if (window.confirm('are you sure?')) {
                setPath([]);
              }}
          }>
            <DeleteForever />
          </IconButton>
        </CardContent>
      </Card>
      <SaveDialog
        open={open}
        handleClickSave={handleClickSave}
        handleClose={handleClose}
      />
    </>
  );
}

/*
import uuid from 'uuid';
import React, { useState } from 'react';
import { NEW } from '../config';

// const dot = ` ${String.fromCharCode(183)} `;

const Controls = ({ viewport, path, setPath, saveRide }) => {
  const [name, setName] = useState(NEW);

  function save() {
    const data = {
      id: uuid(),
      rider: 'Nathan',
      order: 1,
      name,
      path,
      viewport: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom,
      },
    };
    return saveRide(data);
  }

  return (
    <div className="Controls">
      <div><b>Recording...</b></div>
      <div>
        <a onClick={() => setPath(path.slice(0, -1))}>undo last</a>
        <a onClick={() => {
          if (window.confirm('are you sure?')) {
            setPath([]);
          }}}>
          start over
        </a>
      </div>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={save}>save</button>
      </div>
    </div>
  );
}

export default Controls;
*/
