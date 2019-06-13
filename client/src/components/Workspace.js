import React, { useState, useEffect } from 'react';
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

function Workspace(props) {
  const { classes } = props;
  const [error, setError] = useState(null);
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

Workspace.propTypes = {
  api: PropTypes.instanceOf(AudalaiApi),
}

export default withStyles(styles)(Workspace);
