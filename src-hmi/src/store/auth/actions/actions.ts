import { CALL_API } from 'redux-api-middleware';

export const AuthActionTypes = {
    POST_AUTH: "AUTH/POST_AUTH",
    POST_AUTH_SUCCESS: "AUTH/POST_AUTH_SUCCESS",
    POST_AUTH_FAILURE: "AUTH/POST_AUTH_FAILURE"
}

export function authenticate(user: string, password: string) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost/api/login_check',
            method: 'POST',
            body: { user, password },
            types: [
                AuthActionTypes.POST_AUTH, 
                AuthActionTypes.POST_AUTH_SUCCESS, 
                AuthActionTypes.POST_AUTH_FAILURE
            ]
        }
    }
}