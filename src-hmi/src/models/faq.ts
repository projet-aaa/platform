export interface FAQAnswer {
    text: string
    author: string
    date: Date
    votes: number
}

export interface FAQQuestion {
    text: string
    author: string
    date: Date
    answers: FAQAnswer[]
}