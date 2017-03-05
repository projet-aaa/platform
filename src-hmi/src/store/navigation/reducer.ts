import { handleActions } from "redux-actions"

import { ActionTypes, APIActionTypes } from "./actions"

import { Session } from "../../models/session"

export interface NavigationState {
    // the list of not checked disciplines in filters : discipline name -> is checked
    session: Session
    mainLoading: boolean
    fix: boolean
}

let initialState: NavigationState = {
    session: null,
    mainLoading: false,
    fix: false
}

const name = "navigation"
const reducer = handleActions({
    [ActionTypes.START_MAIN_LOAD]: function(state: NavigationState, action): NavigationState {
        return Object.assign({}, state, {
            mainLoading: true
        })
    },
    [ActionTypes.END_MAIN_LOAD]: function(state: NavigationState, action): NavigationState {
        return Object.assign({}, state, {
            mainLoading: false
        })
    },
    [ActionTypes.END_FIX_LOAD]: function(state: NavigationState, action): NavigationState {
        return Object.assign({}, state, {
            fix: !state.fix
        })
    },
    [APIActionTypes.FETCH_SESSION_SUCCESS]: function(state: NavigationState, action): NavigationState {
        return Object.assign({}, state, {
            session: action.payload.session
        })
    }
}, initialState)

export default { [name]: reducer }