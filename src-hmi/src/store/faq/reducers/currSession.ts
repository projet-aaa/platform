import { handleActions } from "redux-actions"

import { ActionTypes } from "../actions/actionTypes"


interface CurrSession {
    currSession : string
}

let initialState: CurrSession = {
    currSession: ""
}

const name = "currSession"
const reducer = handleActions({
    [ActionTypes.STORE_CURRENT_SESSION]: function(state: CurrSession, action: any): CurrSession {
            return {...state, currSession: action.payload.currSession};
    }
}, initialState);

export default { [name]: reducer }