import { createAPIActionCreator } from '../../../utils'
import { ActionTypes, APIActionTypes, WSOutActionTypes } from './actionTypes'

import { QuizType, AttentionStateType } from '../../../models/class/class'

export function chooseAction(choice: any) {
    return { type: ActionTypes.CHOOSE, payload: { choice } }
}

export function prevQuizAction() {
    return { type: ActionTypes.PREV_CONSUL_QUIZ, payload: {} }
}

export function nextQuizAction() {
    return { type: ActionTypes.NEXT_CONSUL_QUIZ, payload: {} }
}

export function answerAction(info: {
    type: string
    text: string
    choiceId: string,
    choice: string,
    questionId: string,
    questionIriId: string
}) {
    return (dispatch) => {
        dispatch(answerAPIAction(info))
        dispatch({
            type: WSOutActionTypes.ANSWER,
            payload: {
                type: info.type,
                choiceId: info.choiceId,
                choice: info.choice,
                questionId: info.questionId
            }
        })
    }
}

export function signalStateAction(info: {
    oldState: string
    state: string
    sessionId: string
    authorId: string
}) {
    return (dispatch) => {
        dispatch(signalStateAPIAction(info))
        dispatch({
            type: WSOutActionTypes.SIGNAL_STATE,
            payload: {
                oldState: info.oldState,
                state: info.state,
                sessionId: info.sessionId,
                authorId: info.authorId
            }
        })
    }
}

export const answerAPIAction: (info: { 
    type: string
    text: string
    choiceId: string,
    questionId: string,
    questionIriId: string
}) => any
= createAPIActionCreator( 
    ((info) => {
        switch(info.type) {
            case QuizType.MCQ: return '/mcq_answers'
            case QuizType.TEXT: return '/text_answers'
        }
    }), 
    ((info) => { 
        switch(info.type) {
            case QuizType.MCQ: return {
                mcqChoice: info.choiceId,
                question: info.questionIriId
                
            }
            case QuizType.TEXT: return {
                question: info.questionIriId,
                text: info.text
            }
        }
    }),
    'POST',
    APIActionTypes.ANSWER,
    APIActionTypes.ANSWER_SUCCESS,
    APIActionTypes.ANSWER_FAILURE
)

export const signalStateAPIAction: (info: {
    state: string
    sessionId: string
    authorId: string
}) => any
= createAPIActionCreator( 
    (ei) => '/alerts', 
    (bi) => { return { 
        author: bi.authorId,
        session: bi.sessionId,
        text: "null",
        alertType: bi.state == AttentionStateType.OK ? "good" :
                   bi.state == AttentionStateType.TOO_FAST ? "tooFast" :
                   bi.state == AttentionStateType.TOO_SLOW ? "tooSlow" : null
    }},
    'POST',
    APIActionTypes.SIGNAL_STATE,
    APIActionTypes.SIGNAL_STATE_SUCCESS,
    APIActionTypes.SIGNAL_STATE_FAILURE
)

export const commentAction: (payload: { 
    text: string
    sessionId: string
    authorId: string
}) => any
= createAPIActionCreator( 
    ((ei) => '/feedbacks'), 
    ((bi) => { return {
        authorId: bi.authorId,
        session: bi.sessionId,
        text: bi.text
    }}),
    'POST',
    APIActionTypes.COMMENT,
    APIActionTypes.COMMENT_SUCCESS,
    APIActionTypes.COMMENT_FAILURE
)