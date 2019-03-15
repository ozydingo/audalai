import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import avatar from './images/guest.png'
import './App.css';

import AppHeader from './AppHeader.js'
import Workspace from './Workspace.js'

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
      light: '#44406b',
      main: '#1a1a40',
      dark: '#00001b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#95e4ff',
      main: '#61b2d8',
      dark: '#2682a6',
      contrastText: '#000',
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

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
            <Workspace />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
