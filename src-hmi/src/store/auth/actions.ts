import { CALL_API } from 'redux-api-middleware'
import { createAPIActionCreator, fetcher } from '../../utils'

import { loginURL, id, username, password } from "../../models/consts"

export const ActionTypes = {
    AUTH_LOCAL: "AUTH/AUTH_LOCAL",

    UPDATE_PROFILE: "AUTH/UPDATE_PROFILE"
}

export const APIActionTypes = {
    FETCH_USER: "AUTH/FETCH_USER",
    FETCH_USER_SUCCESS: "AUTH/FETCH_USER_SUCCESS",
    FETCH_USER_FAILURE: "AUTH/FETCH_USER_FAILURE",

    FETCH_DISCIPLINE: "AUTH/FETCH_DISCIPLINE",
    FETCH_DISCIPLINE_SUCCESS: "AUTH/FETCH_DISCIPLINE_SUCCESS",
    FETCH_DISCIPLINE_FAILURE: "AUTH/FETCH_DISCIPLINE_FAILURE",

    AUTH: "AUTH/POST_AUTH",
    AUTH_SUCCESS: "AUTH/POST_AUTH_SUCCESS",
    AUTH_FAILURE: "AUTH/POST_AUTH_FAILURE"
}

export const WSOutActionTypes = {
    AUTH: "SERVER/AUTHENTIFY"
}

export const WSInActionTypes = {
    
}

export function auth(id: number, username: string, password: string, successPromise?) {
    return (dispatch, getState) => {
        if(!getState().auth.infoFetched) {
            console.log("authentification")
            dispatch(authAPI(username, password))
            dispatch(authLocal(id, username, password))

            let i = setInterval(() => {
                let { auth } = getState()
                if((document as any).token) {
                    clearInterval(i)
                    dispatch(fetchUser({ id }, () => {
                        let { auth } = getState()
                        dispatch(fetchDiscipline({ part: auth.group }, successPromise))
                    }))
                }
            }, 250)
        } else {
            if(successPromise) { successPromise() }
        }
    }
}

const fetchUser: (info: { 
    id: number 
}, promise) => any
= createAPIActionCreator(
    info => '/users/' + info.id, 
    null,
    'GET',
    APIActionTypes.FETCH_USER,
    APIActionTypes.FETCH_USER_SUCCESS,
    APIActionTypes.FETCH_USER_FAILURE,
)
const fetchDiscipline: (info: { 
    part: string 
}, successPromise?) => any
= createAPIActionCreator(
    info => '/disciplines?part=' + info.part, 
    null,
    'GET',
    APIActionTypes.FETCH_DISCIPLINE,
    APIActionTypes.FETCH_DISCIPLINE_SUCCESS,
    APIActionTypes.FETCH_DISCIPLINE_FAILURE
)

function authLocal(id: number, username: string, password: string) {
    return {
        type: ActionTypes.AUTH_LOCAL,
        payload: { id, username, password }
    }
}

export function authAPI(username: string, password: string) {
    return {
        [CALL_API]: {
            endpoint: loginURL,
            method: 'POST',
            headers: { 
                'Content-Type': 'multipart/form-data; boundary=---------------------------20169935266378666911226117058',
            },
            body: '-----------------------------20169935266378666911226117058\n'
                    + 'Content-Disposition: form-data; name="_username"\n'
                    + '\n'
                    + username + '\n'
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

export function updateProfile(group: string) {
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.UPDATE_PROFILE,
            payload: { group }
        })
        dispatch(updateProfileAPI(group, () => {
            dispatch(auth(id, username, password))
        }))
    }
}

export function updateProfileAPI(group: string, success) {
    return (dispatch, getState) => {
        let { auth } = getState()
        fetcher('/users/' + auth.id, 'PUT', {
            part: group
        })
        .then(res => {
            success(res)
        })
        .catch(error => console.log("error in [store/auth/actions/actions.ts:updateProfileAPI]"))
    }
}

export function authWS(id: number, username: string, isTeacher: boolean) {
    return {
        type: WSOutActionTypes.AUTH,
        payload: { id, username, isTeacher }
    }
}