// EXTERNAL IMPORTS
import { handleActions } from "redux-actions"

// INTERNAL IMPORTS
import { ActionTypes, APIActionTypes } from '../actions/actionTypes'
import { Quiz, QuizType, Test } from '../../../models/class/class'
import { modifyArrayElement, shuffle } from '../../../utils/index'

export interface QuestionnaireState {
    // all the quiz available for this session
    quizGroups: Test[]
    // the collection of quiz launched
    actualQuizs: Test
    // the index of the current quiz in the quiz collection "actualQuizs"
    quizIndex: number
    // actual quiz
    currentQuiz: Quiz
    // the list of choices for each quiz
    quizChoices: any[]
    // the mode of quiz consultation (answer or correction)
    quizMode: string
    // the user score
    score: number
    // for each quiz, true if the quiz has been validated
    areValidated: boolean[]
}

// Initialize the array quizChoices
function fillTabChoice(actualQuizs: Test): any[] {
    let res = []
    for(var i = 0; i < actualQuizs.quizs.length; i++) {
        if (actualQuizs.quizs[i].type == QuizType.MCQ) {
            res[actualQuizs.quizs[i].id] = -1
        } else if (actualQuizs.quizs[i].type == QuizType.MMCQ) {
            res[actualQuizs.quizs[i].id] = []
        } else {
            res[actualQuizs.quizs[i].id] = ""
        }
    }
    return res
}

// Initialize the array areValidated
function fillTabValidated(actualQuizs: Test): any[] {
    let res = []
    for(var i = 0; i < actualQuizs.quizs.length; i++) {
        res[actualQuizs.quizs[i].id] = false
    }
    return res
}

// compute the score after each validate action
function computeScore(actualQuizs: Test, quizChoices: any[]): number {
    let res = 0
    for(var i = 0; i < actualQuizs.quizs.length; i++) {
        if (quizChoices[actualQuizs.quizs[i].id] == actualQuizs.quizs[i].answer) {
            res = res + 1
        }
    }
    return res
}

let initialstate: QuestionnaireState = {
    quizGroups: [],
    actualQuizs: null,
    quizIndex: null,
    currentQuiz: null,
    quizChoices: [],
    quizMode: null,
    score: 0,
    areValidated: []
}

const name = "questionnaire"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        return Object.assign({}, state, {
            quizChoices: modifyArrayElement(state.quizChoices, state.currentQuiz.id, [action.payload.choice]),
            areValidated: modifyArrayElement(state.areValidated, state.currentQuiz.id, false)
        })
    },
    [ActionTypes.VALIDATE]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = state.quizIndex + 1
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.quizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz
        if (state.quizIndex != state.actualQuizs.quizs.length-1) {
            newCurrentQuizz = state.actualQuizs.quizs[newIndex]
        } else {
            newCurrentQuizz = state.actualQuizs.quizs[state.quizIndex]
        }
        return Object.assign({}, state, {
            score: computeScore(state.actualQuizs, state.quizChoices),
            quizIndex: newIndex,
            currentQuiz: newCurrentQuizz,
            areValidated: modifyArrayElement(state.areValidated, state.currentQuiz.id, true)
        })
    },
    [ActionTypes.NEXT_CONSUL_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = state.quizIndex + 1
        // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.quizs.length]
        // doesn't exist so we don't change currentQuiz in that case
        let newCurrentQuizz
        if (state.quizIndex!=state.actualQuizs.quizs.length-1) {
            newCurrentQuizz = state.actualQuizs.quizs[newIndex]
        } else {
            newCurrentQuizz = state.actualQuizs.quizs[state.quizIndex]
        }
        // if the quiz hasn't been validate, we reset the choice
        let newQuizChoice = state.quizChoices
        if (!state.areValidated[state.currentQuiz.id]) {
            newQuizChoice = modifyArrayElement(state.quizChoices, state.currentQuiz.id, -1)
        }
        return Object.assign({}, state, {
            quizIndex: newIndex,
            currentQuiz: newCurrentQuizz,
            quizChoices: newQuizChoice
        })
    },
    [ActionTypes.PREV_CONSUL_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        if(state.actualQuizs.quizs.length > 1 && state.quizIndex > 0) {
            let newIndex = state.quizIndex - 1
            let newCurrentQuizz = state.actualQuizs.quizs[newIndex]
            // if the quiz hasn't been validate, we reset the choice
            let newQuizChoice = state.quizChoices
            if (!state.areValidated[state.currentQuiz.id]) {
                newQuizChoice = modifyArrayElement(state.quizChoices, state.currentQuiz.id, -1)
            }
            // something is displayed when quizIndex=actualQuizs.length but actualQuizs[actualQuizs.quizs.length]
            // doesn't exist so we don't change currentQuiz in that case
            return Object.assign({}, state, {
                quizIndex: newIndex,
                currentQuiz: newCurrentQuizz,
                quizChoices: newQuizChoice
            })
        } else {
            return state
        }
    },
    [ActionTypes.SEE_CORRECTION]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newIndex = 0
        return Object.assign({}, state, {
            quizIndex: newIndex,
            currentQuiz: state.actualQuizs.quizs[newIndex],
            quizMode: "correction"
        })
    },
    [ActionTypes.CHOOSE_QUIZ]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        let newQuizs = state.quizGroups.find(q => q.id == action.payload.quizGroupId)
        return Object.assign({}, state, {
            actualQuizs: newQuizs,
            quizIndex: 0,
            currentQuiz: newQuizs.quizs[0],
            quizMode: action.payload.mode,
            score: 0,
            quizChoices: fillTabChoice(newQuizs),
            areValidated: fillTabValidated(newQuizs)
        })
    },
    [ActionTypes.RETURN_TO_CHOICES]: function(state: QuestionnaireState, action: any): QuestionnaireState {
        return Object.assign({}, state, {
            currentQuiz: null
        })
    },
    [APIActionTypes.FETCH_TESTS_SUCCESS]: function(state: QuestionnaireState, action): QuestionnaireState {
        return Object.assign({}, state, {
            quizGroups: action.payload
        })
    }
}, initialstate);

export default { [name]: reducer }