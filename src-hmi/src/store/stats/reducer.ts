import { handleActions } from "redux-actions"
import * as _ from "underscore"

import { Action } from "../../utils"
import { APIActionTypes, ActionTypes } from "./actions"

import { Quiz, QuizType } from "../../models/class/class"
import { Session } from '../../models/session'

export interface StatState {
    panic: number[]
    tooSlow: number[]
    tooFast: number[]
    date: number[]

    comments: {
        comment: string
        commenter: string
        date: Date    
    }[]

    quiz: Quiz[]
    quizChoices: any[]

    currentQuizId: string
}

let initialState: StatState = {
    panic: null,
    tooSlow: null,
    tooFast: null,
    date: null,
    comments: null,

    quiz: null,
    quizChoices: null,
    currentQuizId: null,
}

const name = "stat"
const reducer = handleActions({
    [APIActionTypes.FETCH_STATS_SUCCESS]: function(state: StatState, action: any): StatState {
        let obj = {}
        action.payload.quiz.forEach(q => {
            obj[q.id] = q
        })
        return Object.assign({}, state, {
            panic: action.payload.alerts.panicCurve,
            tooSlow: action.payload.alerts.tooSlowCurve,
            tooFast: action.payload.alerts.tooFastCurve,
            date: _.range(action.payload.alerts.tooFastCurve.length),
            comments: action.payload.comments,
            quiz: obj,
            quizChoices: action.payload.quizChoices,
            currentQuizId: action.payload.quiz[0].id
        })
    }
}, initialState);

export default { [name]: reducer }