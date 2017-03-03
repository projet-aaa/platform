import { handleActions } from "redux-actions"

import { ActionTypes } from "./actions"

export interface NavigationState {
    // the list of not checked disciplines in filters : discipline name -> is checked
    mainLoading: boolean
}

let initialState: NavigationState = {
    mainLoading: false
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
        return Object.assign({}, state)
    }
}, initialState)

export default { [name]: reducer }