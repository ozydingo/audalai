import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import logo from './logo.svg';

function AppHeader(props) {
  return (
    <AppBar className="App-header">
      <Toolbar>
        <div className="app-brand">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="spacer-sm"></div>
          <div className="app-name">audalai</div>
        </div>
        <div className="toolbar-spacer">&nbsp;</div>
        <div className="account-controls">
          <img id="user-avatar" src={props.avatar} alt="user"/>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
