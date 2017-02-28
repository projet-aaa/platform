// ------------------------------
// -- FAQ
// ------------------------------


// An answer to a thread question
export interface ThreadMessage {
    id: number
    text: string
    author: string
    date: Date
    votes: number
}

// A question and its answers
export interface Thread {
    id: number
    text: string
    author: string
    date: Date
    answers: ThreadMessage[]
}   