const axios = require('axios');

class AudalaiApi {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.token = null;
  }

  loginAsGuest() {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{signInGuest{ user{id name nickname} token }}`
    ).then(result => {
      const { signInGuest: { token, user }  = {}} = this.handleLoginResponse(result);
      this.token = token;
      return user;
    });
  }

  login(email, password) {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{ signInUser(login:{email:"${email}", password:"${password}"}){ user{id name nickname} token } }`
    ).then(result => {
      const { signInUser: { token, user } = {}} = this.handleLoginResponse(result);
      this.token = token;
      return user;
    });
  }

  logout() {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{signOutUser{message}}`
    ).then(result => {
      this.token = null;
    });
  }

  createUser(name, email, password) {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{createUser(name:"${name}", loginCredentials:{email:"${email}", password:"${password}"}){id}}`
    ).then(result => {
      console.log(result);
      return this.login(email, password);
    });
  }

  getFiles() {
    return axios.post(
      `${this.endpoint}/graphql?query=query{audios{id,name}}`,
      null,
      {headers: this.authHeaders()}
    )
  }

  authHeaders() {
    if (this.token) {
      return { Authorization: this.token };
    } else {
      return {};
    }
  }

  handleLoginResponse(response) {
    if (response.data.errors) {
      return {token: null, user: null};
    } else {
      return response.data.data;
    }
  }
}

export default AudalaiApi;
