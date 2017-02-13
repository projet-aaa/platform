import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { APIActionTypes, auth } from "./actions"

export interface AuthState {
    login: string
    firstName: string
    lastName: string
    password: string
    email: string

    isTeacher: boolean
    
    disciplines: string[]
    groups: string[]
    group: string

    discipline: string

    token: string

    authentifying: boolean
    authentified: boolean
}

let initialState: AuthState = {
    login: null,
    firstName: "Somin",
    lastName: "Maurel",
    password: null,
    email: "somin.maurel@gmail.fr",
    
    isTeacher: true,
    
    disciplines: ["TOB", "PIM", "PF"],
    groups: ["3INB"],
    group: "3IN",

    discipline: "TOB",
    
    token: null,

    authentifying: true,
    authentified: false
}

const name = "auth"
const reducer = handleActions({
    [APIActionTypes.AUTH]: function(state: AuthState, action: any): AuthState {
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
            authentified: true
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