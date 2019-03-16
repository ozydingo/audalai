import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

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
    padding: '7px',
    height: '2em',
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
    position: 'relative',
    animationName: 'HiddenFile',
    animationTimingFunction: animationTiming,
    animationDuration: animationDuration,
  },
  '@keyframes HiddenFile': {
    from: {
      left: '0px',
      width: '100%',
      opacity: '1',
      padding: '7px',
      height: '2em',
    },
    to: {
      left: '-200px',
      width: '300%',
      opacity: '0',
      height: '0px',
      padding: '0px',
    }
  },
  unhiding: {
    animationName: 'UnhidingFile',
    animationTimingFunction: animationTiming,
    animationDuration: animationDuration,
  },
  '@keyframes UnhidingFile': {
    from: {
      left: '-200px',
      width: '300%',
      opacity: '0',
      height: '0px',
      padding: '0px',
    },
    to: {
      left: '0px',
      width: '100%',
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
      openFile: null,
      closingFile: null,
    }
  }

  closeFile(file) {
    this.setState({
      openFile: null,
      closingFile: file.id,
    });
  }

  openFile(file) {
    this.setState({openFile: file.id});
  }

  fileEntry(file) {
    const { classes } = this.props;
    const isOpen = file.id === this.state.openFile;
    let fileClasses = [];
    let clickHandler = () => null;
    if (this.state.openFile) {
      if (isOpen) {
        fileClasses.push(classes.open);
        clickHandler = () => this.closeFile(file);
      } else {
        fileClasses.push(classes.hidden);
      }
    } else {
      fileClasses.push(classes.closed);
      clickHandler = () => this.openFile(file);
      if (!isOpen && file.id === this.state.closingFile) {
        fileClasses.push(classes.closing);
      } else {
        fileClasses.push(classes.unhiding);
      }
    }
    fileClasses.push(classes.fileEntry);

    return (
      <Paper
          key={file.id}
          className={fileClasses.join(' ')}
          onClick={clickHandler}
          square={true}
      >
        <div>{ file.name }</div>
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
