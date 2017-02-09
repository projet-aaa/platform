import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChangeQuestionValueAction, PublishQuestionAction } from "../actions/actionTypes"
import { Thread } from "../../../models/faq"

interface QuestionInput {
    questionInputVal: string
}

let initialState: QuestionInput = {
    questionInputVal: ''
}

const name = "threadContent"
const reducer = handleActions({
    [ActionTypes.CHANGEQUESTIONVALUE]: function(state: QuestionInput, action: Action<ChangeQuestionValueAction>): QuestionInput {
            return {...state, qestionInputVal: action.payload.questionValue};
    },
    [ActionTypes.PUBLISHQUESTION]: function(state: QuestionInput, action: Action<PublishQuestionAction>): QuestionInput {
            return state;
    },
}, initialState);

export default { [name]: reducer }