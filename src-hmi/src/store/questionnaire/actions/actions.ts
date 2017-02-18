import * as fetch from 'isomorphic-fetch'

import { ActionTypes } from './actionTypes'
import { Quiz } from "../../../models/class/class"

export function chooseAction(choice: any) {
    return { type: ActionTypes.CHOOSE, payload: { choice } }
}

export function validateAction() {
    return { type: ActionTypes.VALIDATE, payload: {} }
}

export function prevQuizAction() {
    return { type: ActionTypes.PREV_CONSUL_QUIZ, payload: {} }
}

export function nextQuizAction() {
    return { type: ActionTypes.NEXT_CONSUL_QUIZ, payload: {} }
}

export function seeCorrectionAction() {
    return { type: ActionTypes.SEE_CORRECTION, payload: {} }
}

export function chooseQuizAction(quizId: string, mode: string) {
    return { type: ActionTypes.CHOOSE_QUIZ, payload: { quizId, mode} }
}

export function chooseComboQuizAction() {
    return { type: ActionTypes.CHOOSE_COMBOQUIZ, payload: {} }
}