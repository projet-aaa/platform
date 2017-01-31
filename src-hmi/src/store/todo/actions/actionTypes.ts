export const ActionTypes = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",

    OPEN: "OPEN",
    CLOSE: "CLOSE",

    ASK_TODO: "ASK_TODO",
    REQUEST_TODO: "REQUEST_TODO",
    RECEIVE_TODO: "RECEIVE_TODO"
}

export interface AddTodoAction {
    id: number, 
    text: string 
}

export interface RemoveTodoAction {
    id: number
}

export interface GeneralAction { }

export interface AskTodoAction { }

export interface RequestTodoAction { }

export interface ReceiveTodoAction { 
    text: string
    receivedAt: number
}