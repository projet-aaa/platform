export const ActionTypes = {
    // When an answer has been chosen (in a question where there is an answer to choose)
    CHOOSE: "QUIZ/CHOOSE", 
    // When the user has validated his own answer
    VALIDATE: "QUIZ/VALIDATE",
    // When the user signals his state of attention
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