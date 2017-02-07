import { handleActions } from "redux-actions"

import { ActionTypes, APIActionTypes, WSInActionTypes } from "../actions/actionTypes"
import { Quiz, QuizInstanceState, AttentionEventType } from "../../../models/class/class"

interface ClassState {
    quiz: Quiz[]

    quizHistory: number[]
    quizState: any[]
    currConsulQuizInd: number

    currQuizId: number
    currQuizState: string
    currQuizStat: any
    choice: any

    studentPop: number
    teacherPop: number
    highscore: number
    maxscore: number
    average: number

    panick: number
    tooSlow: number
    tooFast: number
}

let initialState: ClassState = {
    quiz: [],

    quizHistory: [],
    quizState: [],
    currConsulQuizInd: -1,

    currQuizId: -1,
    currQuizState: QuizInstanceState.OFF,
    currQuizStat: null,
    choice: null,

    studentPop: 0,
    teacherPop: 0,
    highscore: 0,
    maxscore: 0,
    average: 0,

    panick: 0,
    tooSlow: 0,
    tooFast: 0
}

const name = "dashboard"
const reducer = handleActions({
    [ActionTypes.SHOW_FEEDBACK]: function(state: ClassState, action: any): ClassState {
        if(state.currQuizState == QuizInstanceState.HEADING) {
            return Object.assign({}, state, {
                currQuizState: QuizInstanceState.FEEDBACK
            }) 
        } else {
            return state
        }
    },
    [WSInActionTypes.ANSWER]: function(state: ClassState, action: any): ClassState {
        return Object.assign({}, state, {
            currQuizStat: Object.assign({}, state, {
                [action.payload.choice]: state.currQuizStat[action.payload.choice] + 1
            })
        })
    },
    [WSInActionTypes.SIGNAL_STATE]: function(state: ClassState, action: any): ClassState {
        return Object.assign({}, state, {
            panick: state.panick 
                + (action.payload.attentionType == AttentionEventType.PANICK_START ? 1 : 0)
                + (action.payload.attentionType == AttentionEventType.PANICK_END ? -1 : 0),
            tooSlow: state.tooSlow 
                + (action.payload.attentionType == AttentionEventType.TOO_SLOW_START ? 1 : 0)
                + (action.payload.attentionType == AttentionEventType.TOO_SLOW_END ? -1 : 0),
            tooFast: state.tooFast
                + (action.payload.attentionType == AttentionEventType.TOO_FAST_START ? 1 : 0)
                + (action.payload.attentionType == AttentionEventType.TOO_FAST_END ? -1 : 0),
        })
    }
}, initialState);

export default { [name]: reducer }