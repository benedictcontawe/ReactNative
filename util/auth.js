import axios from 'axios';

const API_KEY = 'AIzaSyDpSHgMvKw6-wGVx_zd1zx_9mVkxAiG2K8'

export async function createUser(email, password) {
    const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );
}