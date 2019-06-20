import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

import avatar from '../images/guest.png'

import AppHeader from './AppHeader.js'
import Workspace from './Workspace.js'
import Login from './Login.js'

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
  const classes = useStyles();

  // Try to reauthenticate on first page load
  useEffect(() => {reauthenticate()}, [])

  async function reauthenticate() {
    const user = await audalaiApi.reauthenticate();
    setUser(user);
  }

  function handleLogin({ user }) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppHeader
              avatar={avatar}
              user={user}
              onLogout={handleLogout} />
          <Toolbar />
          <Workspace
              key={user}
              api={audalaiApi}
              user={user} />

          <Login
              open={!audalaiApi.isAuthenticated()}
              api={audalaiApi}
              onLogin={({ user }) => handleLogin({ user })} />
        </div>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

export default App;
