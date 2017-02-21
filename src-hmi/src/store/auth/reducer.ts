import { handleActions } from "redux-actions"

import { APIActionTypes, ActionTypes, auth } from "./actions"

export interface AuthState {
    username: string
    password: string
    firstName: string
    lastName: string
    id: number
    //email: string

    isTeacher: boolean
    
    disciplines: string[]
    groups: string[]
    group: string

    discipline: string

    token: string

    authentifying: boolean
    authentified: boolean
    lastAuthDate: Date
}

let initialState: AuthState = {
    username: null,
    password: null,
    firstName: "Somin",
    lastName: "Maurel",
    id: -1,
    //email: "somin.maurel@gmail.fr",
    
    isTeacher: false,
    
    disciplines: ["TOB", "PIM", "PF"],
    groups: ["3INB"],
    group: "3IN",

    discipline: "TOB",
    
    token: null,
    authentifying: true,
    authentified: false,
    lastAuthDate: null
}

const name = "auth"
const reducer = handleActions({
    [ActionTypes.AUTH_LOCAL]: function(state: AuthState, action: any): AuthState {
        (document as any).token = null
        return Object.assign({}, state, {
            id: action.payload.id,
            username: action.payload.username,
            password: action.payload.password
        })
    },
    [APIActionTypes.FETCH_USER_SUCCESS]: function(state: AuthState, action: any): AuthState {
        return Object.assign({}, state, {
            isTeacher: action.payload.roles.indexOf("ROLE_PROF") >= 0,
            firstName: action.payload.firstname,
            lastName: action.payload.lastname,
            group: action.payload.part ? action.payload.part : "3IN"
        })
    },
    [APIActionTypes.FETCH_DISCIPLINE_SUCCESS]: function(state: AuthState, action: any): AuthState {
        return Object.assign({}, state, {
            disciplines: action.payload["hydra:member"].map(discipline => {
                // TODO
            })
        })
    },
    [APIActionTypes.AUTH]: function(state: AuthState, action: any): AuthState {
        (document as any).token = null
        return Object.assign({}, state, {
            authentifying: true,
            authentified: false
        })
    },
    [APIActionTypes.AUTH_SUCCESS]: function(state: AuthState, action: any): AuthState {
        (document as any).token = action.payload.token
        return Object.assign({}, state, {
            token: action.payload.token,
            authentifying: false,
            authentified: true,
            lastAuthDate: Date.now()
        })
    },
    [APIActionTypes.AUTH_FAILURE]: function(state: AuthState, action: any): AuthState {
        return Object.assign({}, state, {
            token: action.payload.token,
            authentifying: false,
            authentified: false
        })
    }
}, initialState);

export default { [name]: reducer }