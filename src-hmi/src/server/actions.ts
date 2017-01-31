import { Action } from '../utils'

interface SendTextAction {
    text: string
}

export function sendText(text: string): Action<SendTextAction> {
    return {
        type : 'SERVER/MSG',
        payload: { text }
    }
}