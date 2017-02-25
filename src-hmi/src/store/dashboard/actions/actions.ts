import { createAPIActionCreator } from '../../../utils'

import { Action } from '../../../utils'
import { APIActionTypes, WSOutActionTypes } from './actionTypes'

export function startQuiz(quizId) {
    return {
        type: WSOutActionTypes.START_QUIZ,
        payload: { quizId }
    }
}

export function showFeedback() {
    return {
        type: WSOutActionTypes.SHOW_FEEDBACK,
        payload: { }
    }
}

export function stopQuiz() {
    return {
        type: WSOutActionTypes.STOP_QUIZ,
        payload: { }
    }
}

// export const openRoom: (endpointInfo: { sessionId: string }, payload: any) => any
// = createAPIActionCreator(
//     ((endpointInfo) => '/room/open/' + endpointInfo.sessionId),
//     null,
//     'POST',
//     APIActionTypes.OPEN_ROOM,
//     APIActionTypes.OPEN_ROOM_SUCCESS,
//     APIActionTypes.OPEN_ROOM_FAILURE
// )

// export const closeRoom: (endpointInfo: { sessionId: string }, payload: any) => any
// = createAPIActionCreator(
//     ((endpointInfo) => '/room/close/' + endpointInfo.sessionId),
//     null,
//     'POST',
//     APIActionTypes.CLOSE_ROOM,
//     APIActionTypes.CLOSE_ROOM_SUCCESS,
//     APIActionTypes.CLOSE_ROOM_FAILURE
// )

