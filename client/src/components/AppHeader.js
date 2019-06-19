import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CONFIG from '../config.js'

import logo from '../images/logo.svg';

const titleText = CONFIG.ENV === "production" ? "audalai" : "development"

const useStyles = makeStyles(theme => ({
  logo: {
    animationName: 'AppLogoEntry',
    animationTimingFunction: 'cubic-bezier(0.1,0.7,0.7,0.98)',
    position: 'relative',
    animationDuration: '0.5s',
    height: '50px',
    pointerEvents: 'none',
  },
  appBar: {
    borderRadius: '16px',
  },
  brand: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  spacerSm: {
    minWidth: '7px',
  },
  name: {
    alignSelf: 'flex-end',
    marginBottom: '3px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toolbarSpacer: {
    flexGrow: '1',
  },
  accountControls: {
    paddingRight: '16px',
  },
  userAvatar: {
    maxHeight: '35px',
  },
  userName: {
    color: theme.palette.primary.contrastText,
  },

  '@keyframes AppLogoEntry': {
    from: {
      top: '50px',
      opacity: '0',
    },
    to: {
      top: '0px',
      opacity: '0.95',
    }
  }
}));

function userName(user) {
  if (user && user.nickname) {
    return user.nickname;
  } else if (user && user.name) {
    return user.name.split(" ")[0];
  } else {
    return "Anonymous";
  }
}

function AppHeader(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.brand}>
          <img src={logo} className={classes.logo} alt="logo" />
          <div className={classes.spacerSm}></div>
          <div className={classes.name}>{ titleText }</div>
        </div>
        <div className={classes.toolbarSpacer}>&nbsp;</div>
        <div className={classes.accountControls}>
          <div className={classes.userImage}>
            <img className={classes.userAvatar} src={props.avatar} alt="user"/>
            <Typography className={classes.userName}>{userName(props.user)}</Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

AppHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  avatar: PropTypes.any,
};

export default AppHeader;
