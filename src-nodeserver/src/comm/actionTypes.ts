import { QuizLocalChoice, AttentionEventType, ClassState } from '../../../src-hmi/src/models/class'

import { RoomInfo } from '../../../src-hmi/src/models/server'

// -- MAIN
const mainInRoot = "SERVER/MAIN/"
const mainOutRoot = "CLIENT/MAIN/"

export const MainInMsg = {
    AUTHENTIFY: mainInRoot + "AUTHENTIFY",

    GET_ROOMS: mainInRoot + "GET_ROOMS",
    JOIN_ROOM: mainInRoot + "JOIN_ROOM",
    LEAVE_ROOM: mainInRoot + "LEAVE_ROOM",

    CREATE_ROOM: mainInRoot + "CREATE_ROOM",
    CLOSE_ROOM: mainInRoot + "CLOSE_ROOM"
}

export interface AuthentifyAction { id: number }

export interface GetRoomAction { }
export interface JoinRoomAction { roomId: number }
export interface LeaveRoomAction { }

export interface CreateRoomAction { }
export interface CloseRoomAction { roomId: number }

export const MainOutMsg = {
    ROOMS: mainOutRoot + "ROOMS",
    NEW_ROOM: mainOutRoot + "NEW_ROOM",
    OLD_ROOM: mainOutRoot + "OLD_ROOM"
}

export interface GetRoomResAction { rooms: RoomInfo[] }
export interface NewRoomAction { room: RoomInfo }
export interface OldRoomAction { roomId: number }

// -- CLASS
const classInRoot = "SERVER/CLASS/"
const classOutRoot = "CLIENT/CLASS/"

export const ClassInMsg = {
    // STUDENT
    ANSWER: classInRoot + "ANSWER",
    SIGNAL_STATE: classInRoot + "SIGNAL_STATE",
    COMMENT: classInRoot + "COMMENT",

    // TEACHER
    LAUNCH_QUIZ: classInRoot + "LAUNCH_QUIZ",
    FEEDBACK_QUIZ: classInRoot + "FEEDBACK_QUIZ",
    FINISH_QUIZ: classInRoot + "FINISH_QUIZ"
}

export type AnswerAction = QuizLocalChoice
export interface SignalStateAction { state: AttentionEventType }
export interface CommentAction { text: string }

export interface LaunchQuizAction { quizId: number }
export interface FeedbackQuizAction { }
export interface FinishQuizAction { }

export const ClassOutMsg = {
    STATE: classOutRoot + "STATE",

    // STUDENT
    ANSWER: classOutRoot + "ANSWER",
    SIGNAL_STATE: classOutRoot + "SIGNAL_STATE",
    COMMENT: classOutRoot + "COMMENT",

    // TEACHER
    LAUNCH_QUIZ: classOutRoot + "LAUNCH_QUIZ",
    FEEDBACK_QUIZ: classOutRoot + "FEEDBACK_QUIZ",
    FINISH_QUIZ: classOutRoot + "FINISH_QUIZ"
}

export type StateAction = ClassState