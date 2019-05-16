const axios = require('axios');

class AudalaiApi {
  getFiles() {
    return axios.get("https://us-east1-audalai.cloudfunctions.net/guest-list-files");
    // return Promise.resolve({
    //   data: [
    //     {index: 1, id: 1, name: 'lorem.mp3'},
    //     {index: 2, id: 2, name: 'ipsum.ogg'},
    //     {index: 3, id: 5, name: 'dolor.wav'},
    //   ]
    // });
  }
}

export default AudalaiApi;
