import * as fetch from 'isomorphic-fetch'

import { Thread } from "../../../models/faq"

import { Action } from '../../../utils'
import { ActionTypes,
     CreateThreadAction, 
     RetrieveThreadInfosAction, 
     PostThreadMessageAction,
     ChangeQuestionValueAction,
     ChangeAnswerValueAction     
  } from './actionTypes'



export function createThreadAction(text:string, author: string, sessionId: number ) {
    return {
        type: ActionTypes.CREATETHREAD,
        payload: {
            text,
            author,
            sessionId
        }
    }
}


export function postThreadMessageAction(text: string, threadId: number) {
    return {
        type: ActionTypes.POSTTHREADMESSAGE,
        payload: {
            text,
            threadId
        }
    }
}


export function retrieveThreadInfosAction(sessionId: number) {
    return {
        type: ActionTypes.RETRIEVETHREADINFOS,
        payload: {
            sessionId
        }
    }
}

export function receiveThreadInfosAction(sessionId: number, retrievedData: Thread[]) {
    return {
        type: ActionTypes.RECEIVETHREADINFOS,
        payload: {
            sessionId,
            retrievedData
        }
    }
}

export function publishQuestionAction(sessionId: number, questionContent: string) {
    return {
        type: ActionTypes.PUBLISHQUESTION,
        payload: {
            sessionId,
            questionContent
        }
    }
}

export function changeQuestionValueAction (sessionId: number, questionValue: string) {
    return {
        type: ActionTypes.CHANGEQUESTIONVALUE,
        payload: {
            sessionId,
            questionValue
        }
    }
}


export function changeAnswerValueAction (threadId: number, answerValue: string){
    return  {
        type: ActionTypes.CHANGEANSWERVALUE,
        payload: {
            threadId,
            answerValue
        }
    }
}