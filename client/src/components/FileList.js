import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import FileEntry from './FileEntry'

const useStyles = makeStyles({
  fileListContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
});

function FileList(props) {
  const [activeFile, setActiveFile] = useState(null);
  const [activeFileOpen, setActiveFileOpen] = useState(false);

  function closeFile(file) {
    setActiveFile(file);
    setActiveFileOpen(false);
  }

  function openFile(file) {
    setActiveFile(file);
    setActiveFileOpen(true);
  }

  const classes = useStyles();
  return (
    <div className = {classes.fileListContainer} >
      { props.files.map(file => {
        return (
          <FileEntry
              file={file}
              activeFile={activeFile}
              activeFileOpen={activeFileOpen}
              openFile={openFile}
              closeFile={closeFile} />
        )
      })}
    </div>
  );
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

export default FileList;
