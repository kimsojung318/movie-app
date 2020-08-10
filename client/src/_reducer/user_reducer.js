import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types';

// 이전 state과 현재 state를 next state로 만드는 역할
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            // user_action.js에 payload를 넣어준 것
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        case LOGOUT_USER:
            return { ...state }
            break;
        default:
            return state;
    }
}