import { handleActions } from "redux-actions"

import { WSOutActionTypes, APIActionTypes, WSInActionTypes } from "../actions/actionTypes"
import { Quiz, QuizInstanceState, QuizLauncher, AttentionStateType } from "../../../models/class/class"

export interface DashboardState {
    quiz: any
    quizLauncher: QuizLauncher[]

    currQuizId: string
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
    quiz: null,
    quizLauncher: null,

    currQuizId: null,
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
    // LOCAL ACTIONS
    [WSOutActionTypes.SHOW_FEEDBACK]: function(state: DashboardState, action: any): DashboardState {
        if(state.currQuizState == QuizInstanceState.HEADING) {
            return Object.assign({}, state, {
                currQuizState: QuizInstanceState.FEEDBACK
            }) 
        } else {
            return state
        }
    },
    // WEBSOCKET
    [WSInActionTypes.ANSWER]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            currQuizStat: Object.assign({}, state, {
                [action.payload.choice]: state.currQuizStat[action.payload.choice] + 1
            })
        })
    },
    [WSInActionTypes.SIGNAL_STATE]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            panic: state.panic + (action.payload.state == AttentionStateType.PANIC? 1 : 0),
            tooSlow: state.panic + (action.payload.state == AttentionStateType.TOO_SLOW? 1 : 0),
            tooFast: state.panic + (action.payload.state == AttentionStateType.TOO_FAST? 1 : 0),
        })
    },
    [WSInActionTypes.CLASS_JOINED]: function(state: DashboardState, action: any): DashboardState {
        let launchers = []
        Object.keys(action.payload.quiz).forEach(function (key) {
            var quiz = action.payload.quiz[key]
            launchers.push({
                quizId: quiz.id,
                title: quiz.title,
                state: 0, // 0: not done; 1: being run; 2: already ran 
                successRate: 0
            })
        })

        return Object.assign({}, state, {
            quiz: action.payload.quiz,
            quizLauncher: launchers,

            currQuizId: null,
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
        })
    },
    [WSInActionTypes.START_QUIZ]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            quizLauncher: state.quizLauncher.map((launcher: QuizLauncher):QuizLauncher => {
                if(launcher.quizId == action.payload.quiz.id) {
                    return {
                        quizId: launcher.quizId,
                        title: launcher.title,
                        state: 1,
                        successRate: 0
                    }
                } else {
                    return launcher
                }
            }),

            currQuizId: action.payload.quiz.id,
            currQuizState: QuizInstanceState.HEADING,
            currQuizStat: {}
        })
    }
}, initialState);

export default { [name]: reducer }

// panic: state.panic 
//     + (action.payload.attentionType == AttentionEventType.PANIC_START ? 1 : 0)
//     + (action.payload.attentionType == AttentionEventType.PANIC_END ? -1 : 0),
// tooSlow: state.tooSlow 
//     + (action.payload.attentionType == AttentionEventType.TOO_SLOW_START ? 1 : 0)
//     + (action.payload.attentionType == AttentionEventType.TOO_SLOW_END ? -1 : 0),
// tooFast: state.tooFast
//     + (action.payload.attentionType == AttentionEventType.TOO_FAST_START ? 1 : 0)
//     + (action.payload.attentionType == AttentionEventType.TOO_FAST_END ? -1 : 0),