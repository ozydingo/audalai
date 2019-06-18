import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

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
import { audalaiApi as api } from '../lib/AudalaiApi.js'

import guest from '../images/guest.svg'

const useStyles = makeStyles(theme => ({
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
}));

function Login(props) {
  const classes = useStyles();
  const [loginModeIndex, setLoginModeIndex] = useState(0);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmPasswordEntered, setConfirmPasswordEntered] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [createUserError, setCreateUserError] = useState(false);

  function usingExistingAccount() {
    return loginModeIndex === 0;
  }

  function creatingNewAccount() {
    return loginModeIndex === 1;
  }

  function passwordsMatch() {
    return password === confirmPassword;
  }

  function showConfirmPasswordError() {
    return creatingNewAccount() && confirmPasswordEntered && !passwordsMatch();
  }

  function showAuthError() {
    return usingExistingAccount() && authError;
  }

  function showCreateUserError() {
    return creatingNewAccount() && createUserError;
  }

  function helperText() {
    if (showConfirmPasswordError()) {
      return "Passwords don't match";
    } else if (showAuthError()) {
      return "Login failed";
    } else if (showCreateUserError()) {
      return "Something went wrong";
    }
  }

  function loginReady() {
    return true;
  }

  function guestReady() {
    return usingExistingAccount();
  }

  function handleLoginModeChange(event, newValue) {
    setLoginModeIndex(newValue);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    clearErrors();
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    clearErrors();
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function clearErrors() {
    setAuthError(false);
    setCreateUserError(false);
  }

  function handleBadLogin() {
    setAuthError(true);
  }

  function handleCreateUserError() {
    setCreateUserError(true);
  }

  function checkPasswordsMatch(event) {
    setConfirmPasswordEntered(!!event.target.value);
  }

  async function signInGuest() {
    const user = await api.loginAsGuest();
    console.log("User: ", user);
    props.onLogin({ user });
  }

  async function signInUser() {
    const user = await api.login(email, password);
    if (!user) {
      console.log("Login failed");
      handleBadLogin();
    } else {
      console.log("User: ", user);
      props.onLogin({ user });
    }
  }

  async function createUser() {
    const user = await api.createUser("", email, password);
    if (!user) {
      console.log("Create user failed");
      handleCreateUserError();
    } else {
      console.log("User: ", user);
      props.onLogin({ user });
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.closeFn}
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
          <Tabs value={loginModeIndex} onChange={(e, v) => handleLoginModeChange(e, v)}>
            <Tab label="Sign in" />
            <Tab label="Sign up" />
          </Tabs>
          <TextField
              error={showAuthError()}
              label="email"
              name="email"
              onChange={(e) => handleEmailChange(e)} />
          <TextField
              error={showAuthError()}
              label="password"
              name="password"
              type="password"
              onChange={(e) => handlePasswordChange(e)} />
          <Collapse in={creatingNewAccount()}>
            <TextField fullWidth={true}
                error={showConfirmPasswordError()}
                label="confirm password"
                name="confirm_password"
                type="password"
                onChange={(e) => handleConfirmPasswordChange(e)}
                onBlur={(e) => checkPasswordsMatch(e)}
                />
          </Collapse>
          <Collapse in={!!helperText()}>
            <Typography className={classes.helperText}>
              {helperText()}
            </Typography>
          </Collapse>
        </div>
      </DialogContent>
      <DialogActions>
        {guestReady() && <Button onClick={(e) => {signInGuest()}}>
          Continue as guest
        </Button>}
        {usingExistingAccount() && <Button
            onClick={(e) => {signInUser()}}
            variant="contained"
            color="primary"
            disabled={!loginReady()}
            >Login</Button>}
        {creatingNewAccount() && <Button
            onClick={(e) => {createUser()}}
            variant="contained"
            color="primary"
            disabled={!loginReady()}
            >Sign Up</Button>}
      </DialogActions>
    </Dialog>
  )
}

Login.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      open: PropTypes.boolean,
    })
  )
};

export default Login;
