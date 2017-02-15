import { handleActions } from "redux-actions"

import { ActionTypes } from "./actions"

export interface SessionQuizState {
    appType: string
}

let initialState: SessionQuizState = {
    appType: "NONE"
}

const name = "sessionquiz"
const reducer = handleActions({
    [ActionTypes.CHANGE_APP_TYPE]: function(state: SessionQuizState, action: any) {
        return Object.assign({}, state, {
            appType: action.payload.type
        })
    }
}, initialState);

export default { [name]: reducer }