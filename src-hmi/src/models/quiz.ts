export enum QuizType {
    // A multiple choice question
    MCQ,
    // An open question without choice
    TEXT
}

export interface Quiz {
    // the id of the question
    id: number
    // the question type
    type: QuizType
    // the question heading
    question: string
    // the answer choices (potentially no one)
    choices: any

    // the chosen answer
    choice: any
    // true if the answer has been validated
    isValidated: boolean
}