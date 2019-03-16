import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import FileList from './FileList'
import AudalaiApi from './AudalaiApi'

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
  audalaiApi = new AudalaiApi();

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
  }

  handleFilesData(response) {
    this.setState({
      files: response.data,
    })
  }

  componentDidMount() {
    this.audalaiApi.getFiles().then(response => this.handleFilesData(response));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appMain}>
        <Paper className={classes.workspace}>
          <FileList files={this.state.files} />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Workspace);
