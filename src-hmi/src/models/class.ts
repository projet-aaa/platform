export enum QuizType {
    MCQ, TEXT
}

// The heading of a quiz
export interface Quiz {
    id: number
    type: QuizType
    title: string
    question: string
    choices: any
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

export enum AttentionEventType {
    PANICK_START,
    PANICK_END, 
    TOO_SLOW_START, 
    TOO_SLOW_END,
    TOO_FAST_START,
    TOO_FAST_END
}

export interface AttentionEvent {
    state: AttentionEventType,
    time: number
}

export interface CommentEvent {
    text: string
    time: number
}

export type ClassEvent = CommentEvent | AttentionEvent

export enum QuizInstanceState {
    OFF,
    HEADING,
    FEEDBACK
}

export interface ClassState {
    population: number
    maxScore: number
    average: number

    quiz: Quiz[]
    quizRan: QuizRoomChoices[]
    currentQuiz: QuizRoomChoices
    quizState: QuizInstanceState
    
    timeline: ClassEvent[]
}