// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPORTS
import { ActionTypes } from '../actions/actionTypes'

export interface LeftMenuState {
    // true if the left menu is hidden
    isHidden
}

let initialstate: LeftMenuState = {
    isHidden: true
}

const name = "questionnaire"
const reducer = handleActions({
    [ActionTypes.HIDE]: function(state: LeftMenuState, action: any): LeftMenuState {
        return Object.assign({}, state, {
            isHidden: !state.isHidden
        })
    }
}, initialstate);

export default { [name]: reducer }