import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import FileContents from './FileContents'
import { fileAnimationStyles } from './fileListAnimation'

const rootStyles = {
  fileListContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  fileEntry: {
    position: 'relative',
    padding: '7px',
    height: '2em',
    overflow: 'scroll',
  },
};
// TODO: Allow assign order to be reversed; 'height' gets overwritten
const styles = Object.assign({}, rootStyles, fileAnimationStyles);

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

  fileEntry(file) {
    const { classes } = this.props;
    let fileClasses = [];
    let clickHandler = () => null;

    if (this.state.activeFile) {
      if (this.state.activeFileOpen) {
        if (file.id === this.state.activeFile.id) {
          fileClasses.push(classes.open);
          clickHandler = () => this.closeFile(file);
        } else if (file.index < this.state.activeFile.index) {
          fileClasses.push(classes.hiddenAbove, classes.hidden);
        } else if (file.index > this.state.activeFile.index) {
          fileClasses.push(classes.hiddenBelow, classes.hidden);
        }
      } else {
        if (file.id === this.state.activeFile.id) {
          fileClasses.push(classes.closing);
        } else if (file.index < this.state.activeFile.index) {
          fileClasses.push(classes.unhidingAbove);
        } else if (file.index > this.state.activeFile.index) {
          fileClasses.push(classes.unhidingBelow);
        }
      }
    }

    if (!this.state.activeFile || !this.state.activeFileOpen) {
      fileClasses.push(classes.closed);
      clickHandler = () => this.openFile(file);
    }

    fileClasses.push(classes.fileEntry);

    const isOpen = this.state.activeFile &&
      this.state.activeFileOpen &&
      file.id === this.state.activeFile.id;

    return (
      <Paper
          key={file.id}
          className={fileClasses.join(' ')}
          onClick={clickHandler}
          square={true}
      >
        <FileContents file={file} open={isOpen} />
      </Paper>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className = {classes.fileListContainer} >
        { this.props.files.map(file => this.fileEntry(file)) }
      </div>
    );
  }
}

export default withStyles(styles)(FileList);
