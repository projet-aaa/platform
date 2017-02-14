import { createAPIActionCreator } from '../../../utils'
import { ActionTypes, APIActionTypes } from './actionTypes'

export function chooseAction(choice: any) {
    return { type: ActionTypes.CHOOSE, payload: { choice } }
}

export function prevQuizAction() {
    return { type: ActionTypes.PREV_CONSUL_QUIZ, payload: {} }
}

export function nextQuizAction() {
    return { type: ActionTypes.NEXT_CONSUL_QUIZ, payload: {} }
}

export const answerAction: (endpointInfo: any, bodyInfo: { id: number, choice: any}) => any
= createAPIActionCreator( 
    ((endpointInfo) => '/mcq_answers'), 
    null,
    'GET',
    APIActionTypes.ANSWER,
    APIActionTypes.ANSWER_SUCCESS,
    APIActionTypes.ANSWER_FAILURE
)

export const signalStateAction: (endpointInfo: any, bodyInfo: {
    state: string
    sessionId: string
    authorId: string
}) => any
= createAPIActionCreator( 
    (ei) => '/alerts', 
    (bi) => { return { 
        author: bi.authorId,
        session: bi.sessionId,
        text: "null",
        alertType: bi.state
    }},
    'POST',
    APIActionTypes.SIGNAL_STATE,
    APIActionTypes.SIGNAL_STATE_SUCCESS,
    APIActionTypes.SIGNAL_STATE_FAILURE
)

export const commentAction: (endpointInfo: any, payload: { 
    text: string
    sessionId: string
    authorId: string
}) => any
= createAPIActionCreator( 
    ((ei) => '/feedbacks'), 
    ((bi) => { return {
        authorId: bi.authorId,
        sessionId: bi.sessionId,
        text: bi.text
    }}),
    'POST',
    APIActionTypes.COMMENT,
    APIActionTypes.COMMENT_SUCCESS,
    APIActionTypes.COMMENT_FAILURE
)