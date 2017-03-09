import { Action } from "../../../utils"
import { handleActions } from "redux-actions"
import { ActionTypes, APIActionTypes  } from "../actions/actionTypes"

import { Thread } from "../../../models/faq"


interface ThreadMessageInput {
    threadMessageInputVal: string[]
}

let initialState: ThreadMessageInput = {
    threadMessageInputVal: []
}

const name = "threadMessageInput"
const reducer = handleActions({
    [ActionTypes.CHANGE_ANSWER_VALUE]: function(state: ThreadMessageInput, action: any) {
           return Object.assign({}, state, {
	            threadMessageInputVal: Object.assign({},
	            	state.threadMessageInputVal, {
                            [action.payload.threadId]: action.payload.answerValue
                })
           });

    }
}, initialState);

export default { [name]: reducer }