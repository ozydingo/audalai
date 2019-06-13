import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';

import FileContents from './FileContents'
import { fileAnimationStyles } from '../styles/fileListAnimation'

const rootStyles = {
  fileListContainer: {
    width: '100%',
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

const FileEntry = withStyles(styles)(function(props) {
  const { classes } = props;
  let fileClasses = [];
  let clickHandler = () => null;

  if (props.activeFile) {
    if (props.activeFileOpen) {
      if (props.file.id === props.activeFile.id) {
        fileClasses.push(classes.open);
        clickHandler = () => props.closeFile(props.file);
      } else if (props.file.index < props.activeFile.index) {
        fileClasses.push(classes.hiddenAbove, classes.hidden);
      } else if (props.file.index > props.activeFile.index) {
        fileClasses.push(classes.hiddenBelow, classes.hidden);
      }
    } else {
      if (props.file.id === props.activeFile.id) {
        fileClasses.push(classes.closing);
      } else if (props.file.index < props.activeFile.index) {
        fileClasses.push(classes.unhidingAbove);
      } else if (props.file.index > props.activeFile.index) {
        fileClasses.push(classes.unhidingBelow);
      }
    }
  }

  if (!props.activeFile || !props.activeFileOpen) {
    fileClasses.push(classes.closed);
    clickHandler = () => props.openFile(props.file);
  }

  fileClasses.push(classes.fileEntry);

  const isOpen = props.activeFile &&
    props.activeFileOpen &&
    props.file.id === props.activeFile.id;

  return (
    <Paper
        key={props.file.id}
        className={fileClasses.join(' ')}
        onClick={clickHandler}
        square={true}
    >
      <FileContents file={props.file} open={isOpen} />
    </Paper>
  );
});

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
