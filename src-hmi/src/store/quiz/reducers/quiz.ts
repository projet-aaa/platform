// QUIZ REDUCER
// Manages the state of all quiz (question information + user current choice)

// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPOTS
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
        question: "Parmi les langages suivants, lequel est compilé?",
        choices: ["javascript", "C++", "python"],
        choice: -1,
        isValidated: false
    }, {
        id: 1,
        type: QuizType.TEXT,
        question: "Comment s'appelle le patron de conception permettant de séparer contrat et implémentation d'un module?",
        choices: null,
        choice: "",
        isValidated: false
    }]
}

const name = "quiz"
const reducer = handleActions({
    // When an answer for a quiz is chosen, we have to store the new choice for that quiz
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
    // When a quiz is validated, we have to store the fact that the quiz choice has been validated
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