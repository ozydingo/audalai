import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import FileContents from './FileContents'

import { fileAnimationStyles } from '../styles/fileListAnimation'

const rootStyles = {
  fileEntry: {
    position: 'relative',
    padding: '7px',
    height: '2em',
    overflow: 'scroll',
  },
};
// TODO: Allow assign order to be reversed; 'height' gets overwritten
const styles = Object.assign({}, rootStyles, fileAnimationStyles);
const useStyles = makeStyles(styles);

function FileEntry(props) {
  const classes = useStyles();
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
}

export default FileEntry;
