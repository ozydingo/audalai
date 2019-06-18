import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

import avatar from '../images/guest.png'

import AppHeader from './AppHeader.js'
import Workspace from './Workspace.js'
import Login from './Login.js'

import CONFIG from '../config.js';
import { audalaiApi } from '../lib/AudalaiApi'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#e6eaf0',
    textDecoration: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a1a40',
      light: '#44406b',
      dark: '#00001b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#61b2d8',
      light: '#95e4ff',
      dark: '#2682a6',
      contrastText: '#000',
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App(props) {
  const [user, setUser] = useState(null);
  const [loginRequired, setLoginRequired] = useState(true);
  const classes = useStyles();

  function handleLogin({ user }) {
    setUser(user);
    setLoginRequired(!user);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppHeader avatar={avatar} user={user} />
          <Toolbar />
          <Workspace
              key={user}
              api={audalaiApi}
              user={user} />

          <Login
              open={loginRequired}
              api={audalaiApi}
              onLogin={({ user }) => handleLogin({ user })} />
        </div>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default App;
