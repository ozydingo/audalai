import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import FileEntry from './FileEntry'

const styles = {
  fileListContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
};

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFile: null,
      activeFileOpen: false,
    }
  }

  closeFile(file) {
    this.setState({
      activeFile: file,
      activeFileOpen: false,
    });
  }

  openFile(file) {
    this.setState({
      activeFile: file,
      activeFileOpen: true,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className = {classes.fileListContainer} >
        { this.props.files.map(file => {
          return (
            <FileEntry
                file={file}
                activeFile={this.state.activeFile}
                activeFileOpen={this.state.activeFileOpen}
                openFile={this.openFile.bind(this)}
                closeFile={this.closeFile.bind(this)} />
          )
        })}
      </div>
    );
  }
}

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      id: PropTypes.string,
      name: PropTypes.string,
    })
  )
};

export default withStyles(styles)(FileList);
