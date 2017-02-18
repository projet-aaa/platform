import { createAPIActionCreator } from '../../../utils'
import { ActionTypes, APIActionTypes, WSOutActionTypes } from './actionTypes'

import { QuizType } from '../../../models/class/class'

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
    choiceId: string,
    choice: string,
    questionId: string
}) {
    return (dispatch) => {
        let answer = {
            type: WSOutActionTypes.ANSWER,
            payload: {
                type: info.type,
                choiceId: info.choiceId,
                choice: info.choice,
                questionId: info.questionId
            }
        }
        console.log(answer)
        dispatch(answerAPIAction(info))
        dispatch(answer)
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
    choiceId: string,
    questionId: string
}) => any
= createAPIActionCreator( 
    ((info) => {
        switch(info.type) {
            case QuizType.MCQ: return '/mcq_answers'
            case QuizType.TEXT: return null
        }
    }), 
    ((info) => { 
        switch(info.type) {
            case QuizType.MCQ: return {
                mcqChoice: info.choiceId,
                question: info.questionId
            }
            case QuizType.TEXT: return null
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
        alertType: bi.state
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
        sessionId: bi.sessionId,
        text: bi.text
    }}),
    'POST',
    APIActionTypes.COMMENT,
    APIActionTypes.COMMENT_SUCCESS,
    APIActionTypes.COMMENT_FAILURE
)