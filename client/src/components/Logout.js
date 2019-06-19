import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  confirmButton: {
    margin: '12px',
  },
})

function Logout(props) {
  const classes = useStyles();

  return (
    <Dialog
        open={props.open} >
      <DialogTitle id="logout-title">Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure?</Typography>
        <Button
            className={classes.confirmButton}
            variant="contained"
            onClick={props.onClose}>
          No, cancel
        </Button>
        <Button
            className={classes.confirmButton}
            color="primary"
            variant="contained"
            onClick={props.onLogout}>
          Yes, logout
        </Button>
      </DialogContent>
    </Dialog>
  );
}

Logout.propTypes = {
  open: PropTypes.bool,
  onLogout: PropTypes.func,
  onClose: PropTypes.func,
}

export default Logout;
