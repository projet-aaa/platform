// FEEDBACK REDUCER
// Manages the state of feedback component (question information + user current choice)

// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPORTS
import { Action } from "../../../utils"
import { ActionTypes, SignalAction} from "../actions/actionTypes"

interface FeedbackInfo {}

let initialState: FeedbackInfo = {}

const name = "feedback"
const reducer = handleActions({
    // When a feedback is given ...
    [ActionTypes.SIGNAL]: function(state: FeedbackInfo, action: Action<SignalAction>): FeedbackInfo {
        return state
    },
}, initialState);

export default { [name]: reducer }