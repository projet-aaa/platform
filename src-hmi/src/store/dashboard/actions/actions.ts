import * as fetch from 'isomorphic-fetch'

import { Action } from '../../../utils'
import { ActionTypes, LaunchAction, UpdateFeedbackAction } from './actionTypes'

export function launchAction(id: number): Action<LaunchAction> {
    return {
        type: ActionTypes.LAUNCH,
        payload: {
            id
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