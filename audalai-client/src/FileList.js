import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  open: {
    color: 'blue',
  },
  closed: {
  },
  hidden: {
    color: 'grey',
  },
  tableCell: {
    color: 'inherit',
  }
};

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFile: null,
    }
  }

  clickRow(id) {
    if (this.state.openFile === id) {
      this.setState({openFile: null});
    } else {
      this.setState({openFile: id});
    }
  }

  fileRow(file) {
    const { classes } = this.props;

    let className;
    if (this.state.openFile) {
      className = (file.id === this.state.openFile) ? classes.open : classes.hidden;
    } else {
      className = classes.closed;
    }
    return (
      <TableRow
          key={file.id}
          className={className}
          onClick={() => this.clickRow(file.id)}
      >
        <TableCell className = {classes.tableCell}  component='th' scope='row'>{ file.name }</TableCell>
        <TableCell className = {classes.tableCell} >{ file.type }</TableCell>
        <TableCell className = {classes.tableCell} >{ file.created }</TableCell>
      </TableRow>
    );
  }

  fileTable(files) {
    return files.map(file => this.fileRow(file));
  }

  render() {
    const { classes } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow className={classes.tableHead} >
            <TableCell className={classes.columnName}>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.fileTable(this.props.files) }
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(FileList);
