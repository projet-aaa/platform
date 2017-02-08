import { handleActions } from "redux-actions"

import { ActionTypes, APIActionTypes, WSInActionTypes } from '../actions/actionTypes'

import { QuizInstanceState, Quiz } from '../../../models/class/class'

export interface RemoteState {
    quiz: Quiz[]

    quizHistory: number[]
    currConsulQuizInd: number

    currQuizId: number
    currQuizState: string
    choice: any

    score: number
    rank: number
    studentPop: number
    highscore: number
    maxscore: number
    average: number
}

let initialstate: RemoteState = {
    quiz: [],

    quizHistory: [],
    currConsulQuizInd: -1,

    currQuizId: -1,
    currQuizState: QuizInstanceState.OFF,
    choice: null,

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
        let res = Object.assign({}, state)

        if(state.currQuizId != -1) {
            res.quizHistory.push(state.currQuizId)
            res.currQuizId = -1
            res.currQuizState = QuizInstanceState.OFF
            res.choice = null

            res.currConsulQuizInd = state.quizHistory.length - 1
        }   

        res.currQuizId = action.payload.quiz.id
        res.currQuizState = QuizInstanceState.HEADING

        res.quiz[action.payload.quiz.id] = action.payload.quiz

        return res
    },
    [WSInActionTypes.STOP_QUIZ]: function(state: RemoteState, action: any): RemoteState {
        if(state.currQuizId != -1) {
            let res = Object.assign({}, state)

            res.quizHistory.push(state.currQuizId)
            res.currQuizId = -1
            res.currQuizState = QuizInstanceState.OFF
            res.choice = null

            res.currConsulQuizInd = state.quizHistory.length - 1

            return res
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
    }
}, initialstate);

export default { [name]: reducer }