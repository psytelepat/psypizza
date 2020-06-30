import { combineReducers } from 'redux'

import {
    LOGIN_LOGGING,
    LOGIN_LOGGED,
    LOGIN_FAILED,
    HEADERS_SET,
} from './actions'

function headers(api_token) {
    return {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + api_token,
        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
    };
}

function psyPizzAdminReducer(state = {
    isLogging: false,
    isLogged: false,
    loginError: null,
    user: null,
    api_token: "",
    headers: {},
}, action) {
    switch (action.type) {
        case LOGIN_LOGGING:
            return {
                ...state,
                isLogging: true,
                isLogged: false,
                loginError: null,
            }
        case LOGIN_LOGGED:
            return {
                ...state,
                isLogging: false,
                isLogged: true,
                loginError: null,
                api_token: action.token,
                user: action.user,
                headers: headers(action.token),
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLogging: false,
                isLogged: false,
                loginError: action.error
            };
        case HEADERS_SET:
            return {
                ...state,
                headers: action.headers,
            }
        default:
            return state;
    }
}

export default psyPizzAdminReducer;