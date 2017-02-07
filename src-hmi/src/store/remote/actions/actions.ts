import * as fetch from 'isomorphic-fetch'

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

export const answerAction: (endpointInfo: any, payload: { id: number, choice: any}) => any
= createAPIActionCreator( 
    ((endpointInfo) => 'http://localhost/app_dev.php/api/mcq_answers'), 
    'GET',
    APIActionTypes.ANSWER,
    APIActionTypes.ANSWER_SUCCESS,
    APIActionTypes.ANSWER_FAILURE
)

export const signalStateAction: (endpointInfo: any, payload: { state: number }) => any
= createAPIActionCreator( 
    ((endpointInfo) => 'localhost/signalState'), 
    'POST',
    APIActionTypes.SIGNAL_STATE,
    APIActionTypes.SIGNAL_STATE_SUCCESS,
    APIActionTypes.SIGNAL_STATE_FAILURE
)

export const commentAction: (endpointInfo: any, payload: { text: string }) => any
= createAPIActionCreator( 
    ((endpointInfo) => 'localhost/comment'), 
    'POST',
    APIActionTypes.SIGNAL_STATE,
    APIActionTypes.SIGNAL_STATE_SUCCESS,
    APIActionTypes.SIGNAL_STATE_FAILURE
)