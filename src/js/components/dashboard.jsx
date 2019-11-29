// in src/Dashboard.js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Title } from 'react-admin';

export default () => {
  const {
    avatar,
    name,
    email,
    provider,
  } = JSON.parse(localStorage.getItem('user'));
  const useStyles = makeStyles({
    card: {
      display: 'flex',
      width: '375px',
      marginTop: '5px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Title title={`Welcome to the administration ${name}`} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            From:
            { ' ' }
            { provider }
          </Typography>
          { name
          && (
            <Typography component="h5" variant="h5">
              { name }
            </Typography>
          )}
          { name
          && (
            <Typography variant="subtitle1" color="textSecondary">
              { email }
            </Typography>
          )}
        </CardContent>
      </div>
      { avatar
        && (
          <CardMedia
            className={classes.cover}
            image={avatar}
            title="Image"
          />
        )}
    </Card>
  );
};
