import { handleActions } from "redux-actions"

import { WSOutActionTypes, APIActionTypes, WSInActionTypes } from "../actions/actionTypes"
import { Quiz, QuizInstanceState, QuizLauncher, AttentionStateType } from "../../../models/class/class"

export interface DashboardState {
    sessionId: string
    quiz: any
    quizLauncher: QuizLauncher[]

    currQuizId: string
    currQuizState: string
    currQuizStat: any

    studentPop: number
    highscore: number
    maxscore: number
    average: number

    tooFast: number
    tooSlow: number
    panic: number
}

let initialState: DashboardState = {
    sessionId: null,
    quiz: null,
    quizLauncher: null,

    currQuizId: null,
    currQuizState: QuizInstanceState.OFF,
    currQuizStat: null,

    studentPop: 0,
    highscore: 0,
    maxscore: 0,
    average: 0,

    panic: 0,
    tooSlow: 0,
    tooFast: 0
}

const name = "dashboard"
const reducer = handleActions({
    [WSInActionTypes.ANSWER]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            currQuizStat: Object.assign({}, state.currQuizStat, {
                [action.payload.choice]: state.currQuizStat[action.payload.choice] 
                    ? state.currQuizStat[action.payload.choice] + 1 : 1
            })
        })
    },
    [WSInActionTypes.SIGNAL_STATE]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            panic: state.panic 
                + (action.payload.state == AttentionStateType.PANIC ? 1 : 0
                - (action.payload.oldState == AttentionStateType.PANIC ? 1 : 0)),
            tooSlow: state.tooSlow 
                + (action.payload.state == AttentionStateType.TOO_SLOW ? 1 : 0
                - (action.payload.oldState == AttentionStateType.TOO_SLOW ? 1 : 0)),
            tooFast: state.tooFast 
                + (action.payload.state == AttentionStateType.TOO_FAST ? 1 : 0
                - (action.payload.oldState == AttentionStateType.TOO_FAST ? 1 : 0)),
        })
    },
    [WSInActionTypes.CLASS_JOINED]: function(state: DashboardState, action: any): DashboardState {
        let launchers = []
        Object.keys(action.payload.quiz).forEach(function (key) {
            let quiz = action.payload.quiz[key],
                state

            if(action.payload.quizHistory.indexOf(key) >= 0) {
                state = 2
            } else if(action.payload.currQuizId == key) {
                if(action.payload.currQuizState == QuizInstanceState.FEEDBACK) {
                    state = 3
                } else {
                    state = 1
                }
            } else {
                state = 0
            }
        
            launchers.push({
                quizId: quiz.id,
                title: quiz.title,
                state: state, // 0: not done; 1: being run; 2: already ran 
                successRate: 0
            })
        })

        return Object.assign({}, state, {
            sessionId: action.payload.sessionId,
            quiz: action.payload.quiz,
            quizLauncher: launchers,

            currQuizId: action.payload.currQuizId,
            currQuizState: action.payload.currQuizState,
            currQuizStat: action.payload.currQuizStat,

            studentPop: action.payload.studentPop,
            highscore: 0,
            maxscore: 0,
            average: 0,

            panic: action.payload.panic,
            tooSlow: action.payload.tooSlow,
            tooFast: action.payload.tooFast
        })
    },
    [WSInActionTypes.START_QUIZ]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            quizLauncher: state.quizLauncher.map((launcher: QuizLauncher): QuizLauncher => {
                if(launcher.quizId == action.payload.quiz.id) {
                    return {
                        quizId: launcher.quizId,
                        title: launcher.title,
                        state: 1,
                        successRate: 0
                    }
                } else if(launcher.quizId == state.currQuizId) {
                    let answerCount = state.currQuizStat[(state.quiz[state.currQuizId] as Quiz).answer]
                    if(!answerCount) {
                        answerCount = 0
                    }

                    return {
                        quizId: launcher.quizId,
                        title: launcher.title,
                        state: 2,
                        successRate: state.studentPop > 0 ? (answerCount / state.studentPop) * 100 : 0
                    }
                } else {
                    return launcher
                }
            }),

            currQuizId: action.payload.quiz.id,
            currQuizState: QuizInstanceState.HEADING,
            currQuizStat: {}
        })
    },
    [WSInActionTypes.SHOW_FEEDBACK]: function(state: DashboardState, action: any): DashboardState {
        if(state.currQuizState == QuizInstanceState.HEADING) {
            return Object.assign({}, state, {
                quizLauncher: state.quizLauncher.map(launcher => {
                    if(launcher.quizId == state.currQuizId) {
                        return Object.assign({}, launcher, {
                            state: 3  
                        })
                    } else {
                        return launcher
                    }
                }),

                currQuizState: QuizInstanceState.FEEDBACK
            }) 
        } else {
            return state
        }
    },
    [WSInActionTypes.STOP_QUIZ]: function(state: DashboardState, action: any): DashboardState {
        if(state.currQuizState == QuizInstanceState.HEADING 
        || state.currQuizState == QuizInstanceState.FEEDBACK) {
            return Object.assign({}, state, {
                quizLauncher: state.quizLauncher.map(launcher => {
                    let answerCount = state.currQuizStat[(state.quiz[state.currQuizId] as Quiz).answer]
                    if(!answerCount) { answerCount = 0 }
                    
                    if(launcher.quizId == state.currQuizId) {
                        return Object.assign({}, launcher, {
                            state: 2,
                            successRate: state.studentPop ? (answerCount / state.studentPop) * 100 : 0
                        })
                    } else {
                        return launcher
                    }
                }),

                currQuizId: null,
                currQuizState: QuizInstanceState.OFF,
            })
        } else {
            return state
        }
    },
    [WSInActionTypes.STUDENT_COUNT]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            studentPop: action.payload.studentPop
        })
    },
    [WSInActionTypes.STUDENT_DISCONNECT]: function(state: DashboardState, action: any): DashboardState {
        return Object.assign({}, state, {
            panic: state.panic - (action.payload.state == "PANIC" ? 1: 0),
            tooSlow: state.tooSlow - (action.payload.state == "TOO_SLOW" ? 1: 0),
            tooFast: state.tooFast - (action.payload.state == "TOO_FAST" ? 1: 0),
            currQuizStat: action.payload.choice != null ? Object.assign({}, state.currQuizStat, {
                [action.payload.choice]: state.currQuizStat[action.payload.choice] - 1
            }): state.currQuizStat
        })
    }
}, initialState);

export default { [name]: reducer }