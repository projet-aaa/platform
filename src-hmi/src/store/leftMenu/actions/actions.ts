import { ActionTypes } from './actionTypes'

export function hideAction() {
    return { type: ActionTypes.HIDE, payload: {} }
}