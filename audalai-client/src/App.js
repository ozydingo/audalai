import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button'

import logo from './logo.svg';
import avatar from './images/guest.png'
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: teal,
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
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <div className="app-brand">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="spacer-sm"></div>
                <div className="app-name">audalai</div>
              </div>
              <div className="account-controls">
                <img id="user-avatar" src={avatar} alt="user"/>
              </div>
            </header>
            <div className="app-main">
              <div className="workspace">
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
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
