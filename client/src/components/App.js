import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import { withStyles } from '@material-ui/styles';

import avatar from '../images/guest.png'

import AppHeader from './AppHeader.js'
import Workspace from './Workspace.js'
import Login from './Login.js'
import AudalaiApi from '../lib/AudalaiApi'

import CONFIG from '../config.js';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#e6eaf0',
    textDecoration: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
});

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

const audalaiApi = new AudalaiApi(CONFIG.API_ENDPOINT);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRequired: true,
    }
  }

  handleLogin({ user }) {
    this.setState(
      {
        user: user,
        loginRequired: false,
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <AppHeader avatar={avatar} user={this.state.user} />
            <Toolbar />
            <Workspace
                key={this.state.user}
                api={audalaiApi}
                user={this.state.user} />

            <Login
                open={this.state.loginRequired}
                api={audalaiApi}
                onLogin={({ user }) => this.handleLogin({ user })} />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
