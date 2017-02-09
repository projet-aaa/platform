import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { APIActionTypes, auth } from "./actions"

interface AuthInfo {
    user: string
    password: string
    token: string
    authentifying: boolean
    authentified: boolean
}

let initialState: AuthInfo = {
    user: null,
    password: null,
    token: null,
    authentifying: true,
    authentified: false
}

const name = "auth"
const reducer = handleActions({
    [APIActionTypes.AUTH]: function(state: AuthInfo, action: any): AuthInfo {
        return Object.assign({}, state, {
            authentifying: true,
            authentified: false
        })
    },
    [APIActionTypes.AUTH_SUCCESS]: function(state: AuthInfo, action: any): AuthInfo {
        (document as any).token = action.payload.token
        return Object.assign({}, state, {
            token: action.payload.token,
            authentifying: false,
            authentified: true
        })
    },
    [APIActionTypes.AUTH_FAILURE]: function(state: AuthInfo, action: any): AuthInfo {
        return Object.assign({}, state, {
            token: action.payload.token,
            authentifying: false,
            authentified: false
        })
    }
}, initialState);

export default { [name]: reducer }