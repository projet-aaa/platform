export enum QuizType {
    MCQ, TEXT
}

export interface Quiz {
    id: number
    type: QuizType
    question: string
    choices: any
    // the explanations associated to each answer choice
    explanations: any
    // answer
    answer: any

    choice: any
    isValidated: boolean
}