import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import FileList from './FileList'
import AudalaiApi from '../lib/AudalaiApi'

const useStyles = makeStyles({
  workspace: {
    padding: '16px',
    flexGrow: '1',
    minWidth: '70%',
    maxWidth: '90%',
    display: 'flex',
  },
});

function Workspace(props) {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const files = useFiles(props, setError);

  if (error) {
    return (
      <div className={classes.workspace}>
        <p className={classes.error}>{error.message}</p>
      </div>
    )
  } else {
    return (
      <div className={classes.workspace}>
        <FileList files={files} />
      </div>
    )
  }
}

function useFiles(props, setError) {
  const [files, setFiles] = useState([]);

  async function fetchFilesData() {
    console.log("Fetching files");
    props.api.getFiles().then(response => {
      console.log(response);
      handleFilesData(response);
    }).catch(err => {
      setError({message: "Uh oh! We couldn't connect to the server. We're looking into it!"});
    });
  }

  function handleFilesData(response) {
    const fileData = response.data.data.audios.map((file, index) => (
      {index: index, ...file}
    ))
    setFiles(fileData);
  }

  useEffect(() => {
    if (props.user) {
      fetchFilesData();
    }
  }, [props.user]);

  return files;
}

Workspace.propTypes = {
  api: PropTypes.instanceOf(AudalaiApi),
}

export default Workspace;
