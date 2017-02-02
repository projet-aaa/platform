export interface StudentFeedback {
    panicAlert: boolean
    slowerAlert: boolean
    quickerAlert: boolean
}

export interface QuizStats {
    title: string
    choices: Choices[]
    correctAnswer: number
    state: number       //0 : completed, 1 : running, 2 : not done yet
}

export interface Choices {
    id: number
    text: string
    percentChosen: number
}
