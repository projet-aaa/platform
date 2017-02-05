import { IRoom, SocketInfo } from './iroom'

const ClassRoot = "SERVER/CLASS/"
const ClassInMsg = {
    // STUDENT
    ANSWER: ClassRoot + "ANSWER",
    SIGNAL_STATE: ClassRoot + "SIGNAL_STATE",
    COMMENT: ClassRoot + "COMMENT",

    // TEACHER
    LAUNCH_QUIZ: ClassRoot + "LAUNCH_QUIZ",
    FEEDBACK_QUIZ: ClassRoot + "FEEDBACK_QUIZ",
    FINISH_QUIZ: ClassRoot + "FINISH_QUIZ"
}

const ClassOutMsg = {
    STATE: ClassRoot + "STATE"
}

enum QuizType {
    MCQ, TEXT
}

interface Quiz {
    id: number
    type: QuizType
    question: string
    choices: any
}

interface QuizResult {
    quiz: Quiz
    answers: any
}

enum AttentionEventType {
    PANICK_START,
    PANICK_END, 
    TOO_SLOW_START, 
    TOO_SLOW_END,
    TOO_FAST_START,
    TOO_FAST_END
}

interface AttentionEvent {
    type: AttentionEventType,
    time: number
}

interface CommentEvent {
    text: string
    time: number
}

type ClassEvent = CommentEvent | AttentionEvent

interface ClassState {
    quizRan: QuizResult[]
    currentQuiz: QuizResult
    
    timeline: ClassEvent[]
}

export class ClassRoom extends IRoom {

    type: string = "QUIZ"

    state: ClassState

    receive(socket: SocketInfo, type: string, msg) {
        switch(type) {
            case ClassInMsg.ANSWER:

                break
            case ClassInMsg.COMMENT:

                break
            case ClassInMsg.FEEDBACK_QUIZ:
                break
            case ClassInMsg.FINISH_QUIZ:
                break
            case ClassInMsg.LAUNCH_QUIZ:
                break
            case ClassInMsg.SIGNAL_STATE:
                break
        }
    }

    socketEnter(socket: SocketInfo) {
        this.server.send(socket, ClassOutMsg.STATE, this.state)
    }
    socketLeave(socket: SocketInfo) {

    }
}