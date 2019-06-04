const axios = require('axios');

class AudalaiApi {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  loginAsGuest() {
    return axios.post(`${this.endpoint}/graphql?query=mutation{signInGuest{token}}`)
  }

  login(email, password) {
    return axios.post(`${this.endpoint}/graphql?query=mutation{signInUser(login:{email:"${email}", password:"${password}"}){token}}`)
  }

  logout() {
    return axios.post(`${this.endpoint}/graphql?query=mutation{signOutUser{message}}`)
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
