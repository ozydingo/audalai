import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import guest from '../images/guest.svg'

const styles = {
  dialogContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  userImage: {
    width: '30%',
    height: '80%',
    maxWidth: '350px',
    marginRight: '35px',
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModeValue: 0,
    }
  }

  usingExistingAccount() {
    return this.state.loginModeValue === 0;
  }

  creatingNewAccount() {
    return this.state.loginModeValue === 1;
  }

  loginReady() {
    return true;
  }

  guestReady() {
    return this.usingExistingAccount()
  }

  handleChange(event, newValue) {
    this.setState({loginModeValue: newValue})
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.closeFn}
        aria-labelledby="login-title"
        fullWidth={false}
        maxWidth='md'
        >
        <DialogTitle id="login-title">
          Who are you?
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <img className={classes.userImage} src={guest} alt="user"/>
          <div className={classes.authForm}>
            <Tabs value={this.state.loginModeValue} onChange={(e, v) => this.handleChange(e, v)}>
              <Tab label="Sign in" />
              <Tab label="Sign up" />
            </Tabs>
            <TextField label="email" name="email" />
            <TextField label="password" name="password" type="password" />
            <Collapse in={this.creatingNewAccount()}>
              {(true || this.creatingNewAccount()) && <TextField fullWidth={true} label="confirm password" name="confirm_password" type="password" />}
            </Collapse>
          </div>
        </DialogContent>
        <DialogActions>
          {this.guestReady() && <Button onClick={() => {}}>
            Continue as guest
          </Button>}
          <Button onClick={() => {}} variant="contained" color="primary" disabled={!this.loginReady()}>
            {this.usingExistingAccount() ? "Login" : "Sign up"}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Login.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      open: PropTypes.boolean,
    })
  )
};

export default withStyles(styles)(Login);
