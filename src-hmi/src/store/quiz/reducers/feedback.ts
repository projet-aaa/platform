import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, SignalAction} from "../actions/actionTypes"

interface FeedbackInfo {}

let initialState: FeedbackInfo = {}

const name = "feedback"
const reducer = handleActions({
    [ActionTypes.SIGNAL]: function(state: FeedbackInfo, action: Action<SignalAction>): FeedbackInfo {
        return state
    },
}, initialState);

export default { [name]: reducer }