import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChooseAction } from "../actions/actionTypes"
import { Quiz, QuizType } from "../../../models/quiz"

interface QuizInfo {
    quiz: Quiz[]
}

let initialState: QuizInfo = {
    quiz: [{
        id: 0,
        type: QuizType.MCQ,
        question: "Parmi les langages suivants, lequel est compilé?",
        choices: ["javascript", "C++", "python"],
        explanations: ["ezrgeqrsg","dwrgerqg","drhdrh"],
        answer: 1,
        choice: -1,
        isValidated: false
    }, {
        id: 1,
        type: QuizType.TEXT,
        question: "Comment s'appelle le patron de conception permettant de séparer contrat et implémentation d'un module?",
        choices: null,
        explanations: null,
        answer: "Interface",
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
    ["jamais"]: function(state: QuizInfo, action: Action<{ id: number }>): QuizInfo {
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