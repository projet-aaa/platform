import { Action } from "../../../utils/index";
import { ActionTypes, AddTodoAction, RemoveTodoAction, RequestTodoAction, ReceiveTodoAction, AskTodoAction } from "../actions/actionTypes";
import { handleActions } from "redux-actions";
import { Todo } from "../../../models/models"

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const name = "todos"
const reducer = handleActions({
    [ActionTypes.REMOVE_TODO]: function(state: Todo[] = [], action: Action<RemoveTodoAction>): Todo[] {
        let res = []

        for(let e of state) {
            if(e.id != action.payload.id) {
                res.push(e)
            }
        }
        return res
    },
    [ActionTypes.ADD_TODO]: function(state: Todo[] = [], action: Action<AddTodoAction>): Todo[] {
        return [
            ...state,
            { id: action.payload.id, text: action.payload.text }
        ]
    },
    [ActionTypes.RECEIVE_TODO]: function(state: Todo[] = [], action: Action<ReceiveTodoAction>): Todo[] {
        return [
            ...state,
            { id: getRandomInt(0, 1000), text: action.payload.text }
        ]
    },
    message: function(state: Todo[] = [], action): Todo[] {
        return [
            ...state,
            { id: getRandomInt(0, 1000), text: action.data }
        ]
    }
}, [{ id: 0, text: 'Un élément de todo'}, { id: 1, text: 'Un autre élément de todo' }]);

export default { [name]: reducer }