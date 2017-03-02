import { createAPIActionCreator, fetcher } from "../../../utils"
import { ActionTypes, APIActionTypes } from './actionTypes'

import { Thread } from "../../../models/faq"

import { Action } from '../../../utils'


export function changeQuestionValueAction (sessionId: string, questionValue: string) {
    return {
        type: ActionTypes.CHANGE_QUESTION_VALUE,
        payload: {
            sessionId,
            questionValue
        }
    }
}

export function changeAnswerValueAction (threadId: string, answerValue: string){
    return  {
        type: ActionTypes.CHANGE_ANSWER_VALUE,
        payload: {
            threadId,
            answerValue
        }
    }
}

//////// API CALLS /////

export function fetchThreads(sessionId: string) {
    
}

export function postThread(sessionId: string, title: string) {

}

export function postThreadAnswer(threadId: string, answerContent: string) {

}