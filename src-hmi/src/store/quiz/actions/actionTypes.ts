export const ActionTypes = {
    CHOOSE: "QUIZ/CHOOSE",
    VALIDATE: "QUIZ/VALIDATE",
    SIGNAL: "QUIZ/SIGNAL"
}


export interface ChooseAction {
    id: number
    choice: any
}

export interface ValidateAction {
    id: number 
}

// 0: panic
// 1: slow
// 2: fast
export interface SignalAction {
    type: number
}