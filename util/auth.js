import axios from 'axios';
import Constants from 'expo-constants';

// API key from .env file (loaded via app.config.js)
const API_KEY = Constants.expoConfig?.extra?.apiKey;

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