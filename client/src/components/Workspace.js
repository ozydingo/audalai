import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FileList from './FileList'
import AudalaiApi from '../lib/AudalaiApi'

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
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      files: [],
    }
  }

  handleFilesData(response) {
    const fileData = response.data.data.audios.map((file, index) => (
      {index: index, ...file}
    ))
    this.setState({
      files: fileData,
    })
  }

  componentDidMount() {
    this.props.api.getFiles().then(
      response => this.handleFilesData(response)
    ).catch(err => {
      this.setState({error: {message: "Uh oh! We couldn't connect to the server. We're looking into it!"}})
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.error) {
      return (
        <div className={classes.workspace}>
          <p className={classes.error}>{this.state.error.message}</p>
        </div>
      )
    } else {
      return (
        <div className={classes.workspace}>
          <FileList files={this.state.files} />
        </div>
      )
    }
  }
}

FileList.propTypes = {
  api: PropTypes.instanceOf(AudalaiApi),
}

export default withStyles(styles)(Workspace);
