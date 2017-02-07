import { Action } from '../../../utils'
import { ActionTypes, LaunchAction, UpdateFeedbackAction } from './actionTypes'

export function launchAction(title: string) {
    return {
        type: ActionTypes.LAUNCH,
        payload: {
            title
        }
    }
}

export function updateFeedbackAction(type: number, alertOn:boolean): Action<UpdateFeedbackAction> {
    return {
        type: ActionTypes.UPDATEFEEDBACK,
        payload: {
            type, 
            alertOn
        }
    }
}