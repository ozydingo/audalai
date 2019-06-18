import React from 'react'

import Fade from '@material-ui/core/Fade';

function FileContents(props) {
  return (
    <div>
      <div>{ props.file.name }</div>
      <Fade in={props.open}>
        <div> Unfortunately, additional file details are not implmeneted yet.</div>
      </Fade>
    </div>
  );
}

export default FileContents;
