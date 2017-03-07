import { Thread } from "../../../models/faq"

export const ActionTypes = {
    CHANGE_ANSWER_VALUE: "FAQ/CHANGEANSWERVALUE",
    CHANGE_QUESTION_VALUE: "FAQ/CHANGEQUESTIONVALUE",
    STORE_CURRENT_SESSION: "FAQ/STORE_CURRENT_SESSION"
}

export const APIActionTypes = {
        FETCH_THREADS: "FAQ/FETCH_THREADS",
        FETCH_THREADS_SUCCESS: "FAQ/FETCH_THREADS_SUCCESS",
        FETCH_THREADS_FAILURE: "FAQ/FETCH_THREADS_FAILURE",
        
        POST_NEW_THREAD: "FAQ/POST_NEW_THREAD",
        POST_NEW_THREAD_SUCCESS: "FAQ/POST_NEW_THREAD_SUCCESS",
        POST_NEW_THREAD_FAILURE: "FAQ/POST_NEW_THREAD_FAILURE",

        POST_THREAD_ANSWER: "FAQ/POST_THREAD_ANSWER",
        POST_THREAD_ANSWER_SUCCESS: "FAQ/POST_THREAD_ANSWER_SUCCESS",
        POST_THREAD_ANSWER_FAILURE: "FAQ/POST_THREAD_ANSWER_FAILURE"
}


// export interface CreateThreadAction {
//         text: string    
//         author: string      //Maybe better done server side
//         sessionId: number      
// }

// export interface ChangeAnswerValueAction {
//         threadId: number
//         answerValue: string
// }


// export interface PostThreadMessageAction {
//         text: string        //as html
//         threadId: number        
// }


// export interface RetrieveThreadInfosAction {
//         sessionId: number
// }   


// export interface ReceiveThreadInfosAction {
//         sessionId: number
//         retrievedInfos: Thread[]
// }


// export interface PublishQuestionAction {
//         sessionId: number
//         questionContent: string
// }


// export interface ChangeQuestionValueAction {
//         sessionId: number
//         questionValue: string
// }