export enum QuizType {
    MCQ, TEXT
}

export interface Quiz {
    id: number
    type: QuizType
    question: string
    choices: any

    choice: any
    isValidated: boolean
}