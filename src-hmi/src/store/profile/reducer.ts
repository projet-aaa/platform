import { Action } from "../../utils/";
import { ActionTypes } from "./actions";
import { handleActions } from "redux-actions";

import { Session, SessionType } from "../../models/session"

export interface ProfileState {
    edition: boolean

    groupCache: string
}

let initialState: ProfileState = {
    edition: false,

    groupCache: null
}

const name = "profile"
const reducer = handleActions({
    [ActionTypes.TO_PROFILE_EDITION]: function(state: ProfileState, action) {
        return Object.assign({}, state, {
            edition: true,
            groupCache: action.payload.group
        })
    },
    [ActionTypes.TO_RENDER]: function(state: ProfileState, action) {
        return Object.assign({}, state, {
            edition: false
        })
    },
    [ActionTypes.ON_GROUP_CHANGE]: function(state: ProfileState, action) {
        return Object.assign({}, state, {
            groupCache: action.payload.group
        })
    }
}, initialState)

export default { [name]: reducer }