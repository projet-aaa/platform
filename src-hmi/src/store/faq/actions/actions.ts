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
export function fetchThreads(threadIdList: string[]) {
        return dispatch => {
            let resultList = [];
            let receivedFetch = 0;
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
        }
}

export function postThread(sessionId: string, title: string) {

}

export function postThreadAnswer(threadId: string, answerContent: string) {

}