import { Action } from "../../../utils/";
import { ActionTypes, AddTodoAction, RemoveTodoAction, GeneralAction } from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import { Todo } from "../../../models/models"

const name = "stuff"
const reducer = handleActions({
    [ActionTypes.CLOSE]: function(state: { enabled: boolean } = { enabled: true }, action: Action<GeneralAction>): { enabled: boolean } {
        return { enabled: false }
    },
    [ActionTypes.OPEN]: function(state: { enabled: boolean } = { enabled: true }, action: Action<AddTodoAction>): { enabled: boolean } {
        return { enabled: true }
    }
}, { enabled: true });

export default { [name]: reducer }