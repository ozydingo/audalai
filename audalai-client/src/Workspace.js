import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import FileList from './FileList'

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
          <FileList />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Workspace);
