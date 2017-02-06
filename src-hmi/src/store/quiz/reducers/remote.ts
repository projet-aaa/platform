import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChooseAction, ValidateAction} from "../actions/actionTypes"
import { Quiz, QuizType } from "../../../models/quiz"

interface QuizInfo {
    currentQuiz: number
}

let initialState: QuizInfo = {
    currentQuiz: 0
}

const name = "remote"
const reducer = handleActions({
    [ActionTypes.VALIDATE]: function(state: QuizInfo, action: Action<ValidateAction>): QuizInfo {
        return Object.assign({}, state, {
            currentQuiz: state.currentQuiz + 1
        })
    }
}, initialState);

export default { [name]: reducer }