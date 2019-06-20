import CONFIG from '../config.js';
const axios = require('axios');

class AudalaiApi {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.token = this.getToken();
  }

  isAuthenticated() {
    return this.token !== null;
  }

  reauthenticate() {
    if (this.token === null) { return null; }
    return axios.post(
      `${this.endpoint}/graphql?query=query{authenticate{id name nickname}}`,
      null,
      {headers: this.authHeaders()}
    ).then(result => {
      const user = this.handleAuthenticationResponse(result);
      if (user === null) { this.clearToken(); }
      return user;
    })
  }

  loginAsGuest() {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{signInGuest{ user{id name nickname} token }}`
    ).then(result => {
      const { signInGuest: { token, user }  = {}} = this.handleLoginResponse(result);
      this.setToken(token);
      return user;
    });
  }

  login(email, password) {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{ signInUser(login:{email:"${email}", password:"${password}"}){ user{id name nickname} token } }`
    ).then(result => {
      const { signInUser: { token, user } = {}} = this.handleLoginResponse(result);
      this.setToken(token);
      return user;
    });
  }

  logout() {
    return axios.post(
      `${this.endpoint}/graphql?query=mutation{signOutUser{message}}`
    ).then(result => {
      this.clearToken();
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

  handleAuthenticationResponse(response) {
    if (response.data.errors) {
      return null;
    } else {
      return response.data.data.authenticate;
    }
  }

  handleLoginResponse(response) {
    if (response.data.errors) {
      return {token: null, user: null};
    } else {
      return response.data.data;
    }
  }

  setToken(token) {
    if (token !== null) {
      this.token = token;
      window.localStorage.setItem('audalai-jwt', token);
    } else {
      this.clearToken();
    }
  }

  clearToken() {
    this.token = null;
    window.localStorage.removeItem('audalai-jwt');
  }

  getToken() {
    this.token = window.localStorage.getItem('audalai-jwt');
    return this.token;
  }
}

const audalaiApi = new AudalaiApi(CONFIG.API_ENDPOINT);
export { AudalaiApi, audalaiApi };
