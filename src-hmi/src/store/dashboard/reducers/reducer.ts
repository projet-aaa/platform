import { handleActions } from "redux-actions"

import { ActionTypes, APIActionTypes, WSInActionTypes } from "../actions/actionTypes"
import { Quiz, QuizInstanceState, QuizLauncher, AttentionEventType } from "../../../models/class/class"

export interface DashboardState {
    quiz: Quiz[]
    quizLauncher: QuizLauncher[]

    quizHistory: number[]
    quizStat: any[]
    currConsulQuizInd: number

    currQuizId: number
    currQuizState: string
    currQuizStat: any

    studentPop: number
    teacherPop: number
    highscore: number
    maxscore: number
    average: number

    tooFast: number
    tooSlow: number
    panic: number
}

let initialState: DashboardState = {
    quiz: [],
    quizLauncher: [],

    quizHistory: [],
    quizStat: [],
    currConsulQuizInd: -1,

    currQuizId: -1,
    currQuizState: QuizInstanceState.OFF,
    currQuizStat: null,

    studentPop: 0,
    teacherPop: 0,
    highscore: 0,
    maxscore: 0,
    average: 0,

    panic: 0,
    tooSlow: 0,
    tooFast: 0
}

const name = "dashboard"
const reducer = handleActions({
    [ActionTypes.SHOW_FEEDBACK]: function(state: DashboardState, action: any): DashboardState {
        if(state.currQuizState == QuizInstanceState.HEADING) {
            return Object.assign({}, state, {
                currQuizState: QuizInstanceState.FEEDBACK
            }) 
        } else {
            return state
        }
    },
    [WSInActionTypes.ANSWER]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            currQuizStat: Object.assign({}, state, {
                [action.payload.choice]: state.currQuizStat[action.payload.choice] + 1
            })
        })
    },
    [WSInActionTypes.SIGNAL_STATE]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            panick: state.panic 
                + (action.payload.attentionType == AttentionEventType.PANIC_START ? 1 : 0)
                + (action.payload.attentionType == AttentionEventType.PANIC_END ? -1 : 0),
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