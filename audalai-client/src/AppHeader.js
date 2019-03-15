import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import logo from './logo.svg';

const styles = {
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
}

function AppHeader(props) {
  const { classes } = props;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.brand}>
          <img src={logo} className={classes.logo} alt="logo" />
          <div className={classes.spacerSm}></div>
          <div className={classes.name}>audalai</div>
        </div>
        <div className={classes.toolbarSpacer}>&nbsp;</div>
        <div className={classes.accountControls}>
          <img className={classes.userAvatar} src={props.avatar} alt="user"/>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(AppHeader);
