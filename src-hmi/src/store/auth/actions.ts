import { CALL_API } from 'redux-api-middleware';

export const AuthActionTypes = {
    POST_AUTH: "AUTH/POST_AUTH",
    POST_AUTH_SUCCESS: "AUTH/POST_AUTH_SUCCESS",
    POST_AUTH_FAILURE: "AUTH/POST_AUTH_FAILURE"
}

export function authenticate(user: string, password: string) {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost/app_dev.php/api/login_check',
            method: 'POST',
            headers: { 
                'Content-Type': 'multipart/form-data; boundary=---------------------------20169935266378666911226117058',
            },
            body: '-----------------------------20169935266378666911226117058\n'
                    + 'Content-Disposition: form-data; name="_username"\n'
                    + '\n'
                    + user + '\n'
                    + '-----------------------------20169935266378666911226117058\n'
                    + 'Content-Disposition: form-data; name="_password"\n'
                    + '\n'
                    + password + '\n'
                    + '-----------------------------20169935266378666911226117058--\n',
            types: [
                AuthActionTypes.POST_AUTH, 
                AuthActionTypes.POST_AUTH_SUCCESS, 
                AuthActionTypes.POST_AUTH_FAILURE
            ]
        }
    }
}