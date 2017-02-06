import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { AuthActionTypes, authenticate } from "../actions/actions"

interface AuthInfo {
    user: string
    password: string
    token: string
}

let initialState: AuthInfo = {
    user: null,
    password: null,
    token: null
}

const name = "auth"
const reducer = handleActions({
    [AuthActionTypes.POST_AUTH_SUCCESS]: function(state: AuthInfo, action: any): AuthInfo {
        return Object.assign({}, state, {
            token: action.payload.token
        })
    },
}, initialState);

export default { [name]: reducer }