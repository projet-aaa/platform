// ------------------------------
// -- FAQ
// ------------------------------


// An answer to a thread question
export interface ThreadMessage {
    id: string
    text: string
    author: string
    date: Date
    votes: number
}

// A question and its answers
export interface Thread {
    id: string
    text: string
    author: string
    date: Date
    answers: ThreadMessage[]
}   