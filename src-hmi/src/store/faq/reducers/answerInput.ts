import { handleActions } from "redux-actions"

import { Action } from "../../../utils"
import { ActionTypes, ChangeAnswerValueAction, PostThreadMessageAction  } from "../actions/actionTypes"
import { Thread } from "../../../models/faq"

interface ThreadMessageInput {
    threadMessageInputVal: string[]
}

let initialState: ThreadMessageInput = {
    threadMessageInputVal: []
}

const name = "threadMessageInput"
const reducer = handleActions({
    [ActionTypes.CHANGEANSWERVALUE]: function(state: ThreadMessageInput, action: Action<ChangeAnswerValueAction>): ThreadMessageInput {
           return Object.assign({}, state, {
	            threadMessageInputVal: Object.assign({},
	            	state.threadMessageInputVal, {
                            [action.payload.threadId]: action.payload.answerValue
                })
           });

    },
    [ActionTypes.POSTTHREADMESSAGE]: function(state: ThreadMessageInput, action: Action<PostThreadMessageAction>): ThreadMessageInput {
            //Callback after message publishment, nothing to do
            return state;
    },
}, initialState);

export default { [name]: reducer }