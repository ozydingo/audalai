import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
};

class FileList extends Component {
  fileRow(file) {
    return (
      <TableRow key={file.id}>
        <TableCell component='th' scope='row'>{ file.name }</TableCell>
        <TableCell>{ file.type }</TableCell>
        <TableCell>{ file.created }</TableCell>
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
