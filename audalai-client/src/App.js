import React, { Component } from 'react';
import logo from './logo.svg';
import avatar from './images/guest.png'
import './App.css';

class App extends Component {
  render() {
    return (
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
            Hello, world!
          </div>
        </div>
      </div>
    );
  }
}

export default App;
