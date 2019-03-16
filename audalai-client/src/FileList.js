import React, { Component } from 'react';

class FileList extends Component {
  fileRow(file) {
    return (
      <div key={file.id}>{ file.name }</div>
    );
  }

  fileTable(files) {
    return files.map(file => this.fileRow(file));
  }

  render() {
    return (
      <div>
        { this.fileTable(this.props.files) }
      </div>
    );
  }
}

export default FileList;
