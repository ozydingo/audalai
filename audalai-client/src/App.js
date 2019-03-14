import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import logo from './logo.svg';
import avatar from './images/guest.png'
import './App.css';

const styles = themm => ({
  root: {
    color: 'red',
    'min-height': '50px',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  workspace: {
    'min-width': '70%',
    'max-width': '90%',
    'flex-grow': '1',
    'padding': '10px',
  }
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
            <AppBar className="App-header">
              <Toolbar>
                <div className="app-brand">
                  <img src={logo} className="App-logo" alt="logo" />
                  <div className="spacer-sm"></div>
                  <div className="app-name">audalai</div>
                </div>
                <div className="toolbar-spacer">&nbsp;</div>
                <div className="account-controls">
                  <img id="user-avatar" src={avatar} alt="user"/>
                </div>
              </Toolbar>
            </AppBar>
            <div className={classes.appBarSpacer} />
            <div className="app-main">
              <Paper className={['workspace', classes.workspace].join(' ')}>
                <div>Hello, world!</div>
                <Button variant='contained' color='primary'>
                  Primary
                </Button>
                <Button variant='contained' color='secondary'>
                  Secondary
                </Button>
                <Button variant='contained' color='default'>
                  Default
                </Button>
                <div className='error'>
                  Error
                </div>
              </Paper>
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
