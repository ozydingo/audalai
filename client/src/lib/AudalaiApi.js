const axios = require('axios');

class AudalaiApi {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  loginAsGuest() {
    return axios.post(`${this.endpoint}/graphql?query=mutation{signInGuest{ user{id name nickname} token }}`)
  }

  login(email, password) {
    return axios.post(`${this.endpoint}/graphql?query=mutation{ signInUser(login:{email:"${email}", password:"${password}"}){ user{id name nickname} token } }`)
  }

  logout() {
    return axios.post(`${this.endpoint}/graphql?query=mutation{signOutUser{message}}`)
  }

  getFiles() {
    return axios.post(`${this.endpoint}/graphql?query=query{audios{id,name}}`)
  }
}

export default AudalaiApi;
