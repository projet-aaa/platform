export interface ThreadMessage {
    id: number
    text: string
    author: string
    date: Date
    votes: number
}

export interface Thread {
    id: number
    text: string
    author: string
    date: Date
    answers: ThreadMessage[]
}   