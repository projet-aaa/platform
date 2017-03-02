import { handleActions } from "redux-actions"

import { ActionTypes } from "../actions/actionTypes"

interface QuestionInput {
    questionInputVal: string
}

let initialState: QuestionInput = {
    questionInputVal: ''
}

const name = "questionInput"
const reducer = handleActions({
    [ActionTypes.CHANGE_QUESTION_VALUE]: function(state: QuestionInput, action: any): QuestionInput {
            return {...state, questionInputVal: action.payload.questionValue};
    }
}, initialState);

export default { [name]: reducer }