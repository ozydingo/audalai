import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import guest from '../images/guest.svg'

const styles = (theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  helperText: {
    fontSize: '0.8rem',
    textAlign: 'right',
    marginTop: '1.2em',
    color: theme.palette.error.main,
  },
  userImage: {
    width: '30%',
    height: '80%',
    maxWidth: '350px',
    marginRight: '35px',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModeIndex: 0,
      email: null,
      password: null,
      confirmPassword: null,
      confirmPasswordEntered: false,
      authError: false,
    }
  }

  usingExistingAccount() {
    return this.state.loginModeIndex === 0;
  }

  creatingNewAccount() {
    return this.state.loginModeIndex === 1;
  }

  passwordsMatch() {
    return this.state.password === this.state.confirmPassword;
  }

  confirmPasswordError() {
    return this.creatingNewAccount() && this.state.confirmPasswordEntered && !this.passwordsMatch();
  }

  authError() {
    return this.usingExistingAccount() && this.state.authError;
  }

  helperText() {
    if (this.confirmPasswordError()) {
      return "Passwords don't match";
    } else if (this.authError()) {
      return "Login failed";
    }
  }

  loginReady() {
    return true;
  }

  guestReady() {
    return this.usingExistingAccount();
  }

  handleLoginModeChange(event, newValue) {
    this.setState({loginModeIndex: newValue});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, authError: false});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, authError: false});
  }

  handleConfirmPasswordChange(event) {
    this.setState({confirmPassword: event.target.value});
  }

  handleBadLogin() {
    this.setState({authError: true});
  }

  checkPasswordsMatch(event) {
    this.setState({confirmPasswordEntered: !!event.target.value});
  }

  async signInGuest() {
    const user = await this.props.api.loginAsGuest();
    console.log("User: ", user);
    this.props.onLogin({ user });
  }

  async signInUser() {
    const user = await this.props.api.login(this.state.email, this.state.password);
    if (!user) {
      console.log("Login failed");
      this.handleBadLogin();
    } else {
      console.log("User: ", user);
      this.props.onLogin({ user });
    }
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
            <Tabs value={this.state.loginModeIndex} onChange={(e, v) => this.handleLoginModeChange(e, v)}>
              <Tab label="Sign in" />
              <Tab label="Sign up" />
            </Tabs>
            <TextField
                error={this.authError()}
                label="email"
                name="email"
                onChange={(e) => this.handleEmailChange(e)} />
            <TextField
                error={this.authError()}
                label="password"
                name="password"
                type="password"
                onChange={(e) => this.handlePasswordChange(e)} />
            <Collapse in={this.creatingNewAccount()}>
              <TextField fullWidth={true}
                  error={this.confirmPasswordError()}
                  label="confirm password"
                  name="confirm_password"
                  type="password"
                  onChange={(e) => this.handleConfirmPasswordChange(e)}
                  onBlur={(e) => this.checkPasswordsMatch(e)}
                  />
            </Collapse>
            <Collapse in={this.helperText()}>
              <Typography className={classes.helperText}>
                {this.helperText()}
              </Typography>
            </Collapse>
          </div>
        </DialogContent>
        <DialogActions>
          {this.guestReady() && <Button onClick={(e) => {this.signInGuest()}}>
            Continue as guest
          </Button>}
          {this.usingExistingAccount() && <Button
              onClick={(e) => {this.signInUser()}}
              variant="contained"
              color="primary"
              disabled={!this.loginReady()}
              >Login</Button>}
          {this.creatingNewAccount() && <Button
              onClick={() => {}}
              variant="contained"
              color="primary"
              disabled={!this.loginReady()}
              >Sign Up</Button>}
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

export default withTheme()(withStyles(styles)(Login));
