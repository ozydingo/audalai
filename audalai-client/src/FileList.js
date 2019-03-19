import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import FileContents from './FileContents'

const animationTiming = 'cubic-bezier(1,0,0,1)';
const animationDuration = '0.5s';
const styles = {
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
  open: {
    zIndex: '2',
    flexGrow: '1',
    animationName: 'OpenFile',
    animationTimingFunction: animationTiming,
    animationDuration: animationDuration,
  },
  '@keyframes OpenFile': {
    from: {
      flexGrow: '0',
    },
    to: {
      flexGrow: '1',
    }
  },
  closing: {
    animationName: 'ClosingFile',
    animationTimingFunction: animationTiming,
    animationDuration: animationDuration,
  },
  '@keyframes ClosingFile': {
    from: {
      flexGrow: '1',
      zIndex: '2',
    },
    to: {
      flexGrow: '0',
      zIndex: '1',
    }
  },
  closed: {
    flexGrow: '0',
  },
  hidden: {
    opacity: '0',
    padding: '0px',
    height: '0px',
    padding: '0px',
  },
  hiddenAbove: {
    animationName: 'HiddenAbove',
    animationTimingFunction: 'ease-out',
    animationDuration: animationDuration,
  },
  '@keyframes HiddenAbove': {
    from: {
      top: '0px',
      opacity: '1',
      padding: '7px',
      height: '2em',
    },
    to: {
      top: '-250px',
      opacity: '0',
      height: '0px',
      padding: '0px',
    }
  },
  hiddenBelow: {
    animationName: 'HiddenBelow',
    animationTimingFunction: 'ease-out',
    animationDuration: animationDuration,
  },
  '@keyframes HiddenBelow': {
    from: {
      top: '0px',
      opacity: '1',
      padding: '7px',
      height: '2em',
    },
    to: {
      top: '250px',
      opacity: '0',
      height: '0px',
      padding: '0px',
    }
  },
  unhidingAbove: {
    animationName: 'UnhidingAbove',
    animationTimingFunction: 'ease-in',
    animationDuration: animationDuration,
  },
  '@keyframes UnhidingAbove': {
    from: {
      top: '-250px',
      opacity: '0',
      height: '0px',
      padding: '0px',
    },
    to: {
      top: '0px',
      opacity: '1',
      padding: '7px',
      height: '2em',
    },
  },
  unhidingBelow: {
    animationName: 'UnhidingBelow',
    animationTimingFunction: 'ease-in',
    animationDuration: animationDuration,
  },
  '@keyframes UnhidingBelow': {
    from: {
      top: '250px',
      opacity: '0',
      height: '0px',
      padding: '0px',
    },
    to: {
      top: '0px',
      opacity: '1',
      padding: '7px',
      height: '2em',
    },
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
