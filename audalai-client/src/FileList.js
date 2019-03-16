import React, { Component } from 'react';

class FileList extends Component {
  fileRow(file) {
    return (
      <div>{ file.name }</div>
    );
  }

  fileTable(files) {
    return files.map(file => this.fileRow(file));
  }

  render() {
    return (
      <div>
        { this.fileTable([{name: "lorem.wav"}, {name: "ipsum.mp3"}]) }
      </div>
    );
  }
}

export default FileList;
