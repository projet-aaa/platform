import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChooseAction } from "../actions/actionTypes"
import { Quiz, QuizType } from "../../../models/quiz"

interface QuizInfo {
    currentQuiz: number
    consultation: boolean
}

let initialState: QuizInfo = {
    currentQuiz: 0,
    consultation: false
}

const name = "remote"
const reducer = handleActions({
    ["jamais"]: function(state: QuizInfo, action: Action<{}>): QuizInfo {
        return Object.assign({}, state, {
            currentQuiz: state.currentQuiz + 1
        })
    }
}, initialState);

export default { [name]: reducer }