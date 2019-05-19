const axios = require('axios');

class AudalaiApi {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getFiles() {
    return axios.post(`${this.endpoint}/graphql?query=query{audios{id,name}}`)
    // return axios.get("https://us-east1-audalai.cloudfunctions.net/guest-list-files");
    // return Promise.resolve({
    //   data: {data: {audios: [
    //     {index: 1, id: 1, name: 'lorem.mp3'},
    //     {index: 2, id: 2, name: 'ipsum.ogg'},
    //     {index: 3, id: 5, name: 'dolor.wav'},
    //   ]}}
    // });
  }
}

export default AudalaiApi;
