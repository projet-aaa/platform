export interface StudentFeedback {
    // true if a certain treshold of panic button has been clicked
    panicAlert: boolean
    // true if a certain treshold of fast button has been clicked
    slowerAlert: boolean
    // true if a certain treshold of slow button has been clicked
    quickerAlert: boolean
}

export interface QuizStats {
    // the title of the quiz
    title: string
    // the answer choices
    choices: Choices[]
    // the number of the correct answer
    correctAnswer: number
    // the quiz state 0: completed, 1: running, 2: not done yet
    state: number
}

export interface Choices {
    // the answer id
    id: number
    // the answer text
    text: string
    // the percetage of people who chose this answer
    percentChosen: number
}
