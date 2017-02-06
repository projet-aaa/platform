import { 
    MainInMsg, MainOutMsg, ClassInMsg, ClassOutMsg,
    AuthentifyAction, GetRoomAction, JoinRoomAction, LeaveRoomAction, CreateRoomAction, CloseRoomAction,
    GetRoomResAction, NewRoomAction, OldRoomAction, AnswerAction, SignalStateAction, CommentAction,
    LaunchQuizAction, FeedbackQuizAction, FinishQuizAction
} from './actionTypes'

import { AttentionEventType } from '../../../src-hmi/src/models/class'

import { Action } from '../../../src-hmi/src/utils'

export function authentifyAction(id: number): Action<AuthentifyAction> {
    return { type: MainInMsg.AUTHENTIFY, payload: { id } }
}

export function getRoomAction(): Action<GetRoomAction> { 
    return { type: MainInMsg.GET_ROOMS, payload: {} }
}
export function joinRoomAction(roomId: number): Action<JoinRoomAction> {
    return { type: MainInMsg.JOIN_ROOM, payload: { roomId } }
}
export function leaveRoomAction(): Action<LeaveRoomAction> {
    return { type: MainInMsg.LEAVE_ROOM, payload: {} }
}

export function createRoomAction(): Action<CreateRoomAction> {
    return { type: MainInMsg.CREATE_ROOM, payload: {} }
}
export function closeRoomAction(roomId: number): Action<CloseRoomAction> {
    return { type: MainInMsg.CLOSE_ROOM, payload: { roomId } }
}

export function answerAction(quizId: number, choice: any): Action<AnswerAction> {
    return { type: ClassInMsg.ANSWER, payload: { quizId, choice } }
}
export function signalStateAction(state: AttentionEventType): Action<SignalStateAction> {
    return { type: ClassInMsg.SIGNAL_STATE, payload: { state }}
}
export function commentAction(text: string): Action<CommentAction> {
    return { type: ClassInMsg.COMMENT, payload: { text } }
}

export function launchQuizAction(quizId: number): Action<LaunchQuizAction> {
    return { type: ClassInMsg.LAUNCH_QUIZ, payload: { quizId } }
}
export function feedbackQuizAction(): Action<FeedbackQuizAction> {
    return { type: ClassInMsg.FEEDBACK_QUIZ, payload: {} }
}
export function finishQuizAction(): Action<FinishQuizAction> {
    return { type: ClassInMsg.FINISH_QUIZ, payload: {} }
}