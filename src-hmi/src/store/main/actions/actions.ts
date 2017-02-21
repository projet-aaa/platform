import { Action } from '../../../utils'
import { ActionTypes } from './actionTypes'

export function selectFilter(discipline: string) {
    return {
        type: ActionTypes.SELECT_FILTER,
        payload: { discipline }
    }
}

export function search() {
    return {
        type: ActionTypes.SEARCH,
        payload: {}
    }
}