import { handleActions } from "redux-actions"

import { ActionTypes, APIActionTypes, WSInActionTypes } from '../actions/actionTypes'

import { QuizInstanceState, Quiz } from '../../../models/class/class'

export interface RemoteState {
    sessionId: string
    quiz: Quiz[]

    quizHistory: string[]
    currConsulQuizInd: number

    currQuizId: string
    currQuizState: string
    choice: any
    choiceId: string

    score: number
    rank: number
    studentPop: number
    highscore: number
    maxscore: number
    average: number
}

let initialstate: RemoteState = {
    sessionId: null,
    quiz: [],

    quizHistory: [],
    currConsulQuizInd: -1,

    currQuizId: null,
    currQuizState: QuizInstanceState.OFF,
    choice: null,
    choiceId: null,

    score: 0,
    rank: 0,
    studentPop: 0,
    highscore: 0,
    maxscore: 0,
    average: 0
}

const name = "remote"
const reducer = handleActions({
    [ActionTypes.CHOOSE]: function(state: RemoteState, action: any): RemoteState {
        return Object.assign({}, state, {
            choice: action.payload.choice
        })
    },
    [ActionTypes.NEXT_CONSUL_QUIZ]: function(state: RemoteState, action: any): RemoteState {
        let len = state.quizHistory.length
        
        if(len > 0 && state.currConsulQuizInd < len - 1) {
            return Object.assign({}, state, {
                currConsulQuizInd: state.currConsulQuizInd + 1
            })
        } else {
            return state
        }
    },
    [ActionTypes.PREV_CONSUL_QUIZ]: function(state: RemoteState, action: any): RemoteState {
        if(state.quizHistory.length > 0 && state.currConsulQuizInd > 0) {
            return Object.assign({}, state, {
                currConsulQuizInd: state.currConsulQuizInd - 1
            })
        } else {
            return state
        }
    },
    [WSInActionTypes.START_QUIZ]: function(state: RemoteState, action: any): RemoteState {
        if(state.currQuizId != null) {
            return Object.assign({}, state, {
                quiz: Object.assign({}, state.quiz, {
                    [action.payload.quiz.id]: action.payload.quiz
                }),
                quizHistory: [...state.quizHistory, state.currQuizId],
                currQuizId: action.payload.quiz.id,
                currQuizState: QuizInstanceState.HEADING,
                choice: null,
                choiceId: null,
                currConsulQuizInd: state.quizHistory.length - 1
            })
        } else {
            return Object.assign({}, state, {
                quiz: Object.assign({}, state.quiz, {
                    [action.payload.quiz.id]: action.payload.quiz
                }),
                currQuizId: action.payload.quiz.id,
                currQuizState: QuizInstanceState.HEADING,
                choice: null,
                choiceId: null
            })
        }
    },
    [WSInActionTypes.STOP_QUIZ]: function(state: RemoteState, action: any): RemoteState {
        if(state.currQuizId != null) {        
            return Object.assign({}, state, {
                quizHistory: [...state.quizHistory, state.currQuizId],
                currQuizId: null,
                currQuizState: QuizInstanceState.OFF,
                choice: null,
                currConsulQuizInd: state.quizHistory.length - 1
            })
        } else {
            return state
        }
    },
    [WSInActionTypes.STATE_UPDATE]: function(state: RemoteState, action: any): RemoteState {
        return Object.assign({}, state, {
            score: action.payload.score,
            rank: action.payload.rank,
            studentPop: action.payload.studentPop,
            highscore: action.payload.highscore,
            maxscore: action.payload.maxscore,
            average: action.payload.average
        })
    },
    [WSInActionTypes.CLASS_JOINED]: function(state: RemoteState, action: any): RemoteState {
        return Object.assign({}, state, {
            sessionId: action.payload.sessionId,
            quiz: action.payload.quiz,

            quizHistory: action.payload.quizHistory,
            currConsulQuizInd: action.payload.quizHistory.length - 1,

            currQuizId: action.payload.currQuizId,
            currQuizState: action.payload.currQuizState,
            choice: null,
            choiceId: null,

            score: 0,
            rank: 0,
            studentPop: action.payload.studentPop,
            highscore: action.payload.highScore,
            maxscore: action.payload.maxscore,
            average: action.payload.average
        })
    },
    [APIActionTypes.ANSWER_SUCCESS]: function(state: RemoteState, action: any): RemoteState {
        return state
    }
}, initialstate);

export default { [name]: reducer }