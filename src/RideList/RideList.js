import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import FiberNew from '@material-ui/icons/FiberNew';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NEW_ID } from '../config';

const useStyles = makeStyles(theme => ({
  loadingRides: {
    padding: theme.spacing(0, 2),
  },
  bikeIcon: {
    minWidth: 40,
  },
  rideName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingRight: 40,
  },
  actionIcons: {
    position: 'absolute',
    right: 8,
  },
  actionIconButton: {
    marginLeft: 8,
    padding: 8,
  },
}));

function RideList({ rides, selectRide, toggleSaveDialog, toggleDeleteConfirm, children }) {
  const classes = useStyles();

  const handleSelection = (ride) => selectRide(ride);

  const canAdmin = window.location.search === '?admin';

  return (
    <List>
      {!rides.length && (
        <>
          <ListItem><ListItemText primary="Loading..."/></ListItem>
          <div className={classes.loadingRides}>
            <LinearProgress />
          </div>
        </>
      )
      }
      {rides
        .sort((a,b) => a.name.localeCompare(b.name))
        .map((ride) => {
          const { id, name, isSelected, milage, date } = ride;
          const isNew = id === NEW_ID;
          const canEdit = canAdmin && isSelected && !isNew;
          const bikeColor = isSelected ? 'primary' : 'disabled';
          let details = date ? [date] : [];
          details.push(`${milage.toFixed(1)}mi`);
          details = details.join(' • ')
          return (
            <ListItem
              button
              key={name.concat(id)}
              onClick={() => handleSelection(ride)}
              selected={isSelected}
              disableTouchRipple={isSelected}
            >
              <ListItemIcon className={classes.bikeIcon}>
                <DirectionsBike color={bikeColor} />
              </ListItemIcon>
              <ListItemText
                className={classes.rideName}
                primary={name}
                secondary={details}
              />
              {isNew &&
                <IconButton
                  size="small"
                  className={classes.actionIcons}
                  disabled
                >
                  <FiberNew fontSize="small" />
                </IconButton>
              }
              {canEdit &&
                <div className={classes.actionIcons}>
                  <IconButton
                    className={classes.actionIconButton}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveDialog(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    className={classes.actionIconButton}
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleDeleteConfirm(true);
                    }}
                  >
                    <DeleteForever fontSize="small" />
                  </IconButton>
                </div>
              }
            </ListItem>
          );
      })}
    </List>
  );
}

export default React.memo(RideList);
