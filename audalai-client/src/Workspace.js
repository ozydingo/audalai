import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';

const styles = {
  appMain: {
    padding: '16px',
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'center',
  },
  workspace: {
    minWidth: '70%',
    maxWidth: '90%',
    flexGrow: '1',
    padding: '10px',
  }
}

class Workspace extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appMain}>
        <Paper className={classes.workspace}>
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
    )
  }
}

export default withStyles(styles)(Workspace);
