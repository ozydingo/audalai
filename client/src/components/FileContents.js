import React from 'react'
import PropTypes from 'prop-types';

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

FileContents.propTypes = {
  open: PropTypes.bool,
  file: PropTypes.shape({
    name: PropTypes.string,
  })
};

export default FileContents;
