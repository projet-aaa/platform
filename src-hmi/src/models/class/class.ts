// ------------------------------
// -- QUIZ
// ------------------------------
export const QuizType = {
    MCQ: 'MCQ', 
    TEXT: 'TEXT'
}

// The heading of a quiz
export interface Quiz {
    id: number
    type: string
    title: string
    question: string
    choices: any
    answer: any
    explanations: any
}

// The choice of a user for a given quiz
export interface QuizLocalChoice {
    quizId: number

    choice: any
}

// The global result of a group of people for a given quiz
export interface QuizRoomChoices {
    quizId: number

    choices: any[] // player id => choice
}

// ------------------------------
// -- STUDENT ATTENTION
// ------------------------------
export const AttentionEventType = {
    PANICK_START: "PANICK_START",
    PANICK_END: "PANICK_END", 
    TOO_SLOW_START: "TOO_SLOW_START", 
    TOO_SLOW_END: "TOO_SLOW_END",
    TOO_FAST_START: "TOO_FAST_START",
    TOO_FAST_END: "TOO_FAST_END"
}

export interface AttentionEvent {
    type: string,
    time: number
}

export interface CommentEvent {
    text: string
    time: number
}

export type ClassEvent = CommentEvent | AttentionEvent

export const QuizInstanceState = {
    OFF: 'OFF',
    HEADING: 'HEADING',
    FEEDBACK: 'FEEDBACK'
}