class AudalaiApi {
  getFiles() {
    return Promise.resolve({
      data: [
        {id: 1, name: "lorem.mp3"},
        {id: 2, name: "ipsum.ogg"},
      ]
    });
  }
}

export default AudalaiApi;
