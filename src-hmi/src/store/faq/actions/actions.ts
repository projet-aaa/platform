import { createAPIActionCreator, fetcher } from "../../../utils"
import { ActionTypes, APIActionTypes } from './actionTypes'

import { Thread } from "../../../models/faq"

import { Action } from '../../../utils'

export function changeQuestionValueAction (questionValue: string) {
    return {
        type: ActionTypes.CHANGE_QUESTION_VALUE,
        payload: {
            questionValue
        }
    }
}

export function changeAnswerValueAction (threadId: string, answerValue: string){
    return  {
        type: ActionTypes.CHANGE_ANSWER_VALUE,
        payload: {
            threadId,
            answerValue
        }
    }
}

export function storeCurrentSession (currSession: string) {
        return {
            type: ActionTypes.STORE_CURRENT_SESSION,
            payload: { currSession }
        }
}

//////// API CALLS /////
export function fetchThreads(threadIdList: string[], success) {
    return dispatch => {
        let resultList = [];
        let receivedFetch = 0;
        if(threadIdList.length > 0) {
            for (var index=0; index < threadIdList.length; index++) {
                let currentId = threadIdList[index];
                fetcher('/thread/' + currentId +  '/tree' )
                .then(res => {
                    receivedFetch++;
                    resultList.push(res);
                    if(receivedFetch==threadIdList.length) {
                        dispatch({
                            type: APIActionTypes.FETCH_THREADS_SUCCESS,
                            payload: resultList
                        });
                        success()
                    }
                })
                .catch(error => {
                    console.log(error)
                    dispatch({
                        type: APIActionTypes.FETCH_THREADS_FAILURE,
                        payload: error
                    })
                })
            }
        } else {
            success()
        }
    }
}

export function postThread(sessionId: string, title: string, author: string) {
    return dispatch => {
        fetcher('/sessions/' + sessionId)
        .then( res => {
            let postObject = {
                title: title,
                text: title,
                session: res["@id"]
            };
            fetcher('/threads', 'POST', postObject)
            .then(res => {
                dispatch({
                    type: APIActionTypes.POST_NEW_THREAD_SUCCESS,
                    payload: {
                        newThread: res,
                        author: author
                    }
                })
            })
            .catch(error => {
                console.log("Error posting thread to API");
                console.log(error)
                dispatch({
                    type: APIActionTypes.POST_NEW_THREAD_FAILURE,
                    payload: error
                })
            })
        })
    }
}

export function postThreadAnswer(threadId: string, answerContent: string, author: string) {
    return dispatch => {
        fetcher('/threads/' + threadId)
        .then( res => {
            let postObject = {
                text: answerContent,
                thread: res["@id"],
                plusVoters: [],
                downVoters: []
            };
            fetcher('/thread_messages', 'POST', postObject)
            .then(res => {
                dispatch({
                    type: APIActionTypes.POST_THREAD_ANSWER_SUCCESS,
                    payload: {
                        newThreadMessage: res,
                        author: author,
                        threadId: threadId
                    }
                })
            })
            .catch(error => {
                console.log("Error posting thread to API");
                console.log(error)
                dispatch({
                    type: APIActionTypes.POST_NEW_THREAD_FAILURE,
                    payload: error
                })
            })
        })
    }
}