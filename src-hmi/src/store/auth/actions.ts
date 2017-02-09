import { CALL_API } from 'redux-api-middleware';

export const APIActionTypes = {
    AUTH: "AUTH/POST_AUTH",
    AUTH_SUCCESS: "AUTH/POST_AUTH_SUCCESS",
    AUTH_FAILURE: "AUTH/POST_AUTH_FAILURE"
}

export const WSOutActionTypes = {
    AUTH: "SERVER/AUTHENTIFY"
}

export const WSInActionTypes = {
    
}

export function auth(user: string, password: string) {
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
                APIActionTypes.AUTH, 
                APIActionTypes.AUTH_SUCCESS, 
                APIActionTypes.AUTH_FAILURE
            ]
        }
    }
}

export function authWS(id: number, username: string, isTeacher: boolean) {
    return {
        type: WSOutActionTypes.AUTH,
        payload: { id, username, isTeacher }
    }
}