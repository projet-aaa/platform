import { Action } from '../../../utils'
import { ActionTypes } from './actionTypes'

export function showFeedbackAction() {
    return {
        type: ActionTypes.SHOW_FEEDBACK,
        payload: { }
    }
}