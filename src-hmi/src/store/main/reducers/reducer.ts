import { handleActions } from "redux-actions"

import { ActionTypes } from "../actions/actionTypes"

export interface MainState {
    // the list of not checked disciplines in filters : discipline name -> is checked
    areNotChecked: any
    // the string which was in the search bar when the search button was clicked
    searchedString: string
}

let initialState: MainState = {
    areNotChecked: {},
    searchedString: ""
}

const name = "main"
const reducer = handleActions({
    [ActionTypes.SELECT_FILTER]: function(state: MainState, action: any): MainState {
        return Object.assign({}, state, {
            areNotChecked: Object.assign({}, state.areNotChecked, {
                [action.payload.discipline]: !state.areNotChecked[action.payload.discipline]
            })
        })
    },
    [ActionTypes.SEARCH]: function(state: MainState, action: any): MainState {
        return Object.assign({}, state, {
            searchedString: action.payload.searchedString
        })
    }
}, initialState);

export default { [name]: reducer }