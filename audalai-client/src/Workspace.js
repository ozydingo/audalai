import React, { Component } from 'react';

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';

class Workspace extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="app-main">
        <Paper className={['workspace', classes.workspace].join(' ')}>
          <div>Hello, world!</div>
          <Button variant='contained' color='primary'>
            Primary
          </Button>
          <Button variant='contained' color='secondary'>
            Secondary
          </Button>
          <Button variant='contained' color='default'>
            Default
          </Button>
          <div className='error'>
            Error
          </div>
        </Paper>
      </div>
    )
  }
}

export default Workspace;
