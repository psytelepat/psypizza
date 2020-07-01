export const LOGIN_LOGGING = 'LOGIN_LOGGING'
export const LOGIN_LOGGED = 'LOGIN_LOGGED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const HEADERS_SET = 'HEADERS_SET'

export function loginLogging() {            return { type: LOGIN_LOGGING }; }
export function loginLogged(token, user) {  return { type: LOGIN_LOGGED, token: token, user: user }; }
export function loginFailed(error, json) {  return { type: LOGIN_FAILED, error, json }; }
export function headersSet(id, headers) {   return { type: HEADERS_SET, headers }; }