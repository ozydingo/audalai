import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';

import avatar from '../images/guest.png'

import AppHeader from './AppHeader.js'
import Workspace from './Workspace.js'
import AudalaiApi from '../lib/AudalaiApi'

import CONFIG from '../config.js';

const styles = themm => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#e6eaf0',
    textDecoration: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  appBarSpacer: theme.mixins.toolbar,
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
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const audalaiApi = new AudalaiApi(CONFIG.API_ENDPOINT);

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <AppHeader avatar={avatar}/>
            <div className={classes.appBarSpacer} />
            <Workspace api={audalaiApi} />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
