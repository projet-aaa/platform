import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ClassInMsg, SignalStateAction } from '../../../../../src-nodeserver/src/comm/actionTypes'

interface FeedbackInfo {}

let initialState: FeedbackInfo = {}

const name = "feedback"
const reducer = handleActions({
    [ClassInMsg.SIGNAL_STATE]: function(state: FeedbackInfo, action: Action<SignalStateAction>): FeedbackInfo {
        return state
    },
}, initialState);

export default { [name]: reducer }