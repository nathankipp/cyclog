import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from '../config';
import nathan from '../static/nathan.png';
import sarah from '../static/sarah.jpeg';
import jesse from '../static/jesse.jpeg';

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
  hideForSmall: {
    '@media only screen and (max-width: 620px)': {
      display: 'none',
    },
  },
  avatars: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    right: theme.spacing(2),
    '@media only screen and (max-width: 420px)': {
      right: theme.spacing(1),
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    '@media only screen and (max-width: 420px)': {
      height: theme.spacing(4),
      width: theme.spacing(4),
      marginRight: theme.spacing(1),
    },
  },
  inactive: {
    opacity: .25
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header({ match, isDrawerOpen, toggleDrawer, addRider, removeRider }) {
  const classes = useStyles();
  const handleDrawerOpen = () => toggleDrawer(true);
  const { riders, rideId } = match.params;
  const isInactive = name => !riders.includes(name);
  // const small = useMediaQuery('(max-width: 420px)');

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
            {riders === 'jessecoconut' ? 'Jesse Coconut\'s Cyclog' : 'Sibling Cyclog'}
          </Typography>
          <div className={clsx(classes.avatars, isDrawerOpen && classes.hide)}>
            {riders === 'jessecoconut' && (
              <Avatar
                className={classes.avatar}
                src={jesse}
              />
            )}
            {riders !== 'jessecoconut' && [nathan,sarah,jesse].map(avatar => {
              const name = avatar.replace(/^.*\/(\w+)..*$/, "$1");
              const inactive = isInactive(name);
              const A = () => (
                <Avatar
                  className={clsx(classes.avatar, inactive && classes.inactive, isDrawerOpen && classes.hideForSmall)}
                  src={avatar}
                />
              );
              if (inactive) {
                const newRiders = `${riders.concat(`,${name}`)}`;
                return (
                  <Link key={name} to={`/${newRiders}${rideId ? `/${rideId}` : ''}`}>
                    <A />
                  </Link>
                );
              } else if (riders.includes(',')) {
                const newRiders = riders.split(',').filter(r => r !== name).join(',');
                return (
                  <Link key={name} to={`/${newRiders}${rideId ? `/${rideId}` : ''}`}>
                    <A />
                  </Link>
                );
              } else {
                return (<A key={name} />);
              }
            })}
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default withRouter(React.memo(Header));
