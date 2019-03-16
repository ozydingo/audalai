import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const styles = {
  fileEntry: {
    height: '3em',
  },
  open: {
    animationName: 'OpenFile',
    animationTimingFunction: 'cubic-bezier(0.1,0.7,0.7,0.98)',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },
  '@keyframes OpenFile': {
    to: {
      height: '10em',
    }
  },
  closing: {
    animationName: 'ClosingFile',
    animationTimingFunction: 'cubic-bezier(0.1,0.7,0.7,0.98)',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },
  '@keyframes ClosingFile': {
    from: {
      height: '10em',
    },
    to: {
      height: '3em',
    }
  },
  closed: {
  },
  hidden: {
    animationName: 'HiddenFile',
    animationTimingFunction: 'cubic-bezier(0.1,0.7,0.7,0.98)',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },
  '@keyframes HiddenFile': {
    from: {
      opacity: '1',
      height: '10em',
    },
    to: {
      opacity: '0.1',
      height: '3em',
      display: 'none',
    }
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

  clickRow(id) {
    if (this.state.openFile === id) {
      this.setState({
        openFile: null,
        closingFile: id,
      });
    } else {
      this.setState({openFile: id});
    }
  }

  fileClasses(file) {
    const { classes } = this.props;
    const isOpen = file.id === this.state.openFile;
    let fileClasses = [];
    if (this.state.openFile) {
      fileClasses.push(isOpen ? classes.open : classes.hidden);
    } else {
      fileClasses.push(classes.closed);
    }
    if (!isOpen && file.id === this.state.closingFile) {
      fileClasses.push(classes.closing);
    }
    fileClasses.push(classes.fileEntry);
    return fileClasses;
  }

  fileEntry(file) {
    const fileClasses = this.fileClasses(file);
    return (
      <Paper
          key={file.id}
          className={fileClasses.join(' ')}
          onClick={() => this.clickRow(file.id)}
          square={true}
      >
        <div>{ file.name }</div>
      </Paper>
    );
  }

  fileTable(files) {
    return files.map(file => this.fileEntry(file));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        { this.fileTable(this.props.files) }
      </div>
    );
  }
}

export default withStyles(styles)(FileList);
