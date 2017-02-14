import { createAPIActionCreator } from '../../../utils'

import { Action } from '../../../utils'
import { ActionTypes, APIActionTypes } from './actionTypes'

export function showFeedbackAction() {
    return {
        type: ActionTypes.SHOW_FEEDBACK,
        payload: { }
    }
}

export const openRoom: (endpointInfo: { sessionId: string }, payload: any) => any
= createAPIActionCreator(
    ((endpointInfo) => '/room/open/' + endpointInfo.sessionId),
    null,
    'POST',
    APIActionTypes.OPEN_ROOM,
    APIActionTypes.OPEN_ROOM_SUCCESS,
    APIActionTypes.OPEN_ROOM_FAILURE
)

export const closeRoom: (endpointInfo: { sessionId: string }, payload: any) => any
= createAPIActionCreator(
    ((endpointInfo) => '/room/close/' + endpointInfo.sessionId),
    null,
    'POST',
    APIActionTypes.CLOSE_ROOM,
    APIActionTypes.CLOSE_ROOM_SUCCESS,
    APIActionTypes.CLOSE_ROOM_FAILURE
)