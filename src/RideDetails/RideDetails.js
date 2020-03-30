import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import nathan from '../static/nathan.png';
import sarah from '../static/sarah.jpeg';
import jesse from '../static/jesse.jpeg';

const useStyles = makeStyles(theme => ({
  card: {
    paddingLeft: theme.spacing(5),
    position: 'absolute',
    top: theme.spacing(10),
    right: '50%',
    transform: 'translateX(50%)',
  },
  cardContent: {
    '&:last-child': { paddingBottom: theme.spacing(1) },
    display: 'flex',
    justifyContent: 'space-around',
  },
  avatarGroup: {
    position: 'absolute',
    left: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    flexDirection: 'column',
    marginTop: 4,
    marginLeft: 8,
  },
  avatar: {
    borderWidth: 1,
    margin: '-6px 0 0 0',
    height: theme.spacing(3),
    width: theme.spacing(3),
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

function RideDetails({ ride }) {
  const classes = useStyles();

  const { date, milage, name, riders } = ride;
  let details = date ? [date] : [];
  if (milage) {
    details.push(`${milage.toFixed(1)}mi`);
  }
  details = details.join(' • '); console.log(ride);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <AvatarGroup className={classes.avatarGroup}>
          {riders.split(',').map(rider => {
            return (
              <Avatar
                key={rider}
                className={classes.avatar}
                src={getAvatar(rider)}
              />
            );
          })}
        </AvatarGroup>
        <div>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{details}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default RideDetails;
