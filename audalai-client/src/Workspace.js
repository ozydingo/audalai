import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import FileList from './FileList'
import AudalaiApi from './AudalaiApi'

const styles = {
  workspace: {
    padding: '16px',
    flexGrow: '1',
    minWidth: '70%',
    maxWidth: '90%',
    display: 'flex',
  },
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
      <div className={classes.workspace}>
        <FileList files={this.state.files} />
      </div>
    )
  }
}

export default withStyles(styles)(Workspace);
