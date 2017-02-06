import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChooseAction, ValidateAction} from "../actions/actionTypes"
import { Quiz, QuizType, QuizLocalChoice } from "../../../models/class"

interface QuizInfo {
    quiz: Quiz[]
    quizChoices: QuizLocalChoice[]
}

let initialState: QuizInfo = {
    quiz: [{
        id: 0,
        type: QuizType.MCQ,
        title: "Langage",
        question: "Parmi les langages suivants, lequel est compilé?",
        choices: ["javascript", "C++", "python"]
    }, {
        id: 1,
        type: QuizType.TEXT,
        title: "Patron de conception",
        question: "Comment s'appelle le patron de conception permettant de séparer contrat et implémentation d'un module?",
        choices: null,
    }],
    quizChoices: []
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