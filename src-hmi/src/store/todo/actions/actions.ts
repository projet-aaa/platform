import { CALL_API } from 'redux-api-middleware';

import { Action } from '../../../utils'
import { ActionTypes, AddTodoAction, RemoveTodoAction, GeneralAction } from "../actionTypes"
import { APIActionTypes, GetTodoAction } from "../apiActionTypes"

export function addTodo(id: number, text: string): Action<AddTodoAction> {
    return {
        type: ActionTypes.ADD_TODO,
        payload: { id: id, text: text }
    }
}

export function removeTodo(id: number): Action<RemoveTodoAction> {
    return {
        type: ActionTypes.REMOVE_TODO,
        payload: { id }
    }
}

export function close(): Action<GeneralAction> {
    return {
        type: ActionTypes.CLOSE,
        payload: { }
    }
}
export function open(): Action<GeneralAction> {
    return {
        type: ActionTypes.OPEN,
        payload: { }
    }
}

export function requestTodo() {
    return {
        [CALL_API]: {
            endpoint: 'http://localhost:8000/static/todo.json',
            method: 'GET',
            types: [
                APIActionTypes.GET_TODO, 
                APIActionTypes.GET_TODO_SUCCESS, 
                APIActionTypes.GET_TODO_FAILURE
            ]
        }
    }
}