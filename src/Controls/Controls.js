import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Undo from '@material-ui/icons/Undo';
import Save from '@material-ui/icons/Save';
import DeleteForever from '@material-ui/icons/DeleteForever';

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

export default function Controls({ undoPath, toggleSaveDialog, toggleDeleteConfirm }) {
  const classes = useStyles();

  const handleUndoClick = () => undoPath();

  const handleSaveClick = () => toggleSaveDialog(true);

  const handleDeleteClick = () => toggleDeleteConfirm(true);

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <IconButton
            aria-label="undo"
            className={classes.undo}
            onClick={handleUndoClick}
          >
            <Undo />
          </IconButton>
          <IconButton
            aria-label="save"
            className={classes.save}
            onClick={handleSaveClick}
          >
            <Save />
          </IconButton>
          <IconButton
            aria-label="trash"
            className={classes.delete}
            onClick={handleDeleteClick}
          >
            <DeleteForever />
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
}
