import axios from "axios";

export const remoteGet = axios.create({
    baseURL: 'http://1.13.21.160:5001/',
    timeout: 3000
});

export const localGet = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 3000
});

export const remotePost = axios.create({
    method: 'POST',
    baseURL: 'http://1.13.21.160:5001/',
    timeout: 3000
})

export const localPost = axios.create({
    method: 'POST',
    baseURL: 'http://localhost:5000/',
    timeout: 3000
})

export const localImg = 'http://localhost:5000/'

export const remoteImg = 'http://1.13.21.160:5001/'

export default {remoteGet, remotePost, remoteImg, localGet, localPost, localImg}