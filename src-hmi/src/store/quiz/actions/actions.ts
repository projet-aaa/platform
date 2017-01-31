import * as fetch from 'isomorphic-fetch'

import { Action } from '../../../utils'
import { ActionTypes, ValidateAction, ChooseAction, SignalAction} from './actionTypes'

export function validateAction(id: number): Action<ValidateAction> {
    return {
        type: ActionTypes.VALIDATE,
        payload: { 
            id
        }
    }
}

export function chooseAction(id: number, choice: any): Action<ChooseAction> {
    return {
        type: ActionTypes.CHOOSE,
        payload: {
            id, choice
        }
    }
}

export function signalAction(type: number): Action<SignalAction> {
    return {
        type: ActionTypes.SIGNAL,
        payload: {
            type
        }
    }
}