export const ActionTypes = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",

    OPEN: "OPEN",
    CLOSE: "CLOSE"
}

export interface AddTodoAction {
    id: number, 
    text: string 
}

export interface RemoveTodoAction {
    id: number
}

export interface GeneralAction { }