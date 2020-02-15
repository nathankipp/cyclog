import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from '../config';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#323296',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  avatars: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    right: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header({ isDrawerOpen, toggleDrawer }) {
  const classes = useStyles();

  const handleDrawerOpen = () => toggleDrawer(true);

  return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, isDrawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sibling Cyclog
          </Typography>
          {/*<div className={classes.avatars}>
            <Avatar className={classes.avatar}>N</Avatar>
            <Avatar className={classes.avatar}>S</Avatar>
            <Avatar className={classes.avatar}>J</Avatar>
          </div>*/}
        </Toolbar>
      </AppBar>
  );
}

export default React.memo(Header);
