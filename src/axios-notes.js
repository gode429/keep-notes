import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://keep-notes-eee64.firebaseio.com/'
});

export default instance;