import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, LaunchAction, UpdateFeedbackAction } from "../actions/actionTypes"
import { StudentFeedback } from "../../../models/dashboard"

interface StudentFeedbackInfo {
    feedbackState: StudentFeedback
}

let initialState: StudentFeedback = {
    panicAlert: true,
    slowerAlert: false,
    quickerAlert: true
}

const name = "studentFeedback"
const reducer = handleActions({
    [ActionTypes.UPDATEFEEDBACK]: function(state: StudentFeedbackInfo, action: Action<UpdateFeedbackAction>): StudentFeedbackInfo {
            switch(action.payload.type) {
                case 0:
                    return Object.assign({}, state, {panicAlert: action.payload.alertOn})
                case 1:
                    return Object.assign({}, state, {slowerAlert: action.payload.alertOn})
                case 2:
                    return Object.assign({}, state, {quickerAlert: action.payload.alertOn})
                default:
                    return state
            } 
    },
}, initialState);

export default { [name]: reducer }