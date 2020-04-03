import React from 'react';
import { withRouter, useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import nathan from '../static/nathan.png';
import sarah from '../static/sarah.jpeg';
import jesse from '../static/jesse.jpeg';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import FiberNew from '@material-ui/icons/FiberNew';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NEW_ID } from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      color: 'black',
      textDecoration: 'none',
    }
  },
  loadingRides: {
    padding: theme.spacing(0, 2),
  },
  bikeIcon: {
    minWidth: 40,
  },
  avatarGroup: {
    flexDirection: 'column',
    marginTop: 8,
    marginRight: 8,
  },
  avatar: {
    borderWidth: 1,
    margin: '-6px 0 0 0',
    height: theme.spacing(3),
    width: theme.spacing(3),
  },
  rideName: {
    '& span': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    paddingRight: '0 10px 0 0',
  },
  selected: {
    paddingRight: 75,
  },
  actionIcons: {
    position: 'absolute',
    right: 8,
    zIndex: 10,
  },
  actionIconButton: {
    marginLeft: 8,
    padding: 8,
  },
}));

const getAvatar = name => {
  switch(name) {
    case 'sarah': return sarah;
    case 'jesse': return jesse;
    case 'nathan': return nathan;
    default: return undefined;
  }
}
const getParams = search => new URLSearchParams(search);
const getCanAdmin = search => getParams(search).has('admin');

function RideList({ match, rides, selectRide, toggleSaveDialog, toggleDeleteConfirm, children }) {
  const classes = useStyles();
  const { riders } = match.params;
  const canAdmin = getCanAdmin(useLocation().search);
  const handleSelection = (ride) => selectRide(ride);

  return (
    <List className={classes.root}>
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
          let details = date ? [date] : [];
          details.push(`${milage.toFixed(1)}mi`);
          details = details.join(' • ');
          return (
            <Link to={`/${riders}/${id}`} key={name.concat(id)}>
              <ListItem
                button
                onClick={() => handleSelection(ride)}
                selected={isSelected}
                disableTouchRipple={isSelected}
              >
                <AvatarGroup className={classes.avatarGroup}>
                  {ride.riders.split(',').map(rider => {
                    return (
                      <Avatar
                        key={rider}
                        className={classes.avatar}
                        src={getAvatar(rider)}
                      />
                    );
                  })}
                </AvatarGroup>
                <ListItemText
                  className={clsx(classes.rideName, canEdit && classes.selected)}
                  primary={ride.name}
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
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSaveDialog(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      className={classes.actionIconButton}
                      color="secondary"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDeleteConfirm(true);
                      }}
                    >
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </div>
                }
              </ListItem>
            </Link>
          );
      })}
    </List>
  );
}

export default withRouter(React.memo(RideList));
