import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) { // LoginPage.js body를 파라미터로 받아옴
    // server > index.js에 구현된 로그인 api로 전달 및 데이터 받아오기
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    // Redux로 전달
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() { // get은 body 부분 필요X
    const request = axios.get('/api/users/auth')
    .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}