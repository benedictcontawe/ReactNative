import axios from 'axios';

const API_KEY = 'AIzaSyDpSHgMvKw6-wGVx_zd1zx_9mVkxAiG2K8'

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(
        url, {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );
    console.log('authenticate ' + response.data);
    const token = response.data.idToken;
    return token;
  }  
  
  export function createUser(email, password) {
    return authenticate('signUp', email, password);
  }
  
  export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
  }