import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChooseAction, ValidateAction} from "../actions/actionTypes"
import { Quiz, QuizType } from "../../../models/quiz"

interface QuizInfo {
    quiz: Quiz[]
}

let initialState: QuizInfo = {
    quiz: [{
        id: 0,
        type: QuizType.MCQ,
        question: "Ceci est une question?",
        choices: ["ok", "oui", "non"],
        choice: -1,
        isValidated: false
    }, {
        id: 1,
        type: QuizType.TEXT,
        question: "Tapez ce que vous pensez",
        choices: null,
        choice: "",
        isValidated: false
    }]
}

const name = "quiz"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: QuizInfo, action: Action<ChooseAction>): QuizInfo {
        return Object.assign({}, state, {
            quiz: state.quiz.map(q => {
                if(q.id == action.payload.id) {
                    return Object.assign({}, q, {
                        choice: action.payload.choice
                    })
                }
                return q
            })
        })
    },
    [ActionTypes.VALIDATE]: function(state: QuizInfo, action: Action<ValidateAction>): QuizInfo {
        return Object.assign({}, state, {
            quiz: state.quiz.map((q, index) => {
                if(q.id == action.payload.id) {
                    return Object.assign({}, q, {
                        isValidated: true
                    })
                }
                return q
            })
        })
    }
}, initialState);

export default { [name]: reducer }