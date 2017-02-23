import { Action, fetcher } from '../../utils'

import { Quiz } from '../../models/class/class'

export const OutMsgType = {
    GET_ROOMS: "SERVER/GET_ROOMS",
    JOIN_ROOM: "SERVER/JOIN_ROOM",
    LEAVE_ROOM: "SERVER/LEAVE_ROOM",

    OPEN_ROOM: "SERVER/OPEN_ROOM",
    CLOSE_ROOM: "SERVER/CLOSE_ROOM",

    ROOM_SUBSCRIBE: "SERVER/ROOM_SUBSCRIBE",
    ROOM_UNSUBSCRIBE: "SERVER/ROOM_UNSUBSCRIBE"
}

export const InMsgType = {
    AUTHENTIFIED: "CLIENT/AUTHENTIFIED",
    
    GET_ROOMS_RES: "CLIENT/GET_ROOMS_RES",
    JOIN_ROOM_RES: "CLIENT/JOIN_ROOM_RES",
    LEAVE_ROOM_RES: "CLIENT/LEAVE_ROOM_RES",

    ROOM_OPENED: "CLIENT/ROOM_OPENED",
    ROOM_CLOSED: "CLIENT/ROOM_CLOSED"
}

export function getRooms() {
    return {
        type: OutMsgType.GET_ROOMS,
        payload: {}
    }
}
export function subscribe(fetch: boolean) {
    return {
        type: OutMsgType.ROOM_SUBSCRIBE,
        payload: { fetch }
    }
}
export function unsubscribe() {
    return {
        type: OutMsgType.ROOM_UNSUBSCRIBE,
        payload: {}
    }
}

export function joinRoom(roomId: number) {
    return {
        type: OutMsgType.JOIN_ROOM,
        payload: { roomId }
    }
}

export function leaveRoom() {
    return {
        type: OutMsgType.LEAVE_ROOM,
        payload: {} 
    }
}

export function openClassRoom(sessionId: string) {
    return dispatch => {
        fetcher('/sessions/' + sessionId)
        .then((res: any) => {
            return res.tests.map(test => {
            let list = test.split('/')
            return list[list.length - 1]
        })})
        .then(tests => {
            let resQuestions = [],
                choicesMissing = 0
            tests.forEach(test => {
                fetcher('/tests/' + test)
                .then((res: any) => res.questions.map(test => {
                    let list = test.split('/')
                    return list[list.length - 1]
                }))
                .then(questions => {
                    questions.forEach(question => {
                        fetcher('/questions/' + question)
                        .then((question: any) => {
                            resQuestions.push(question)
                            question.choices = []

                            choicesMissing += question.mcqChoices.length
                            
                            question.mcqChoices.forEach(choice => {
                                let list = choice.split('/'),
                                    choiceId = list[list.length - 1]

                                fetcher('/mcq_choices/' + choiceId)
                                .then((choice: any) => {
                                    question.choices.push(choice)
                                    choicesMissing--
                                    if(!choicesMissing) {
                                        console.log(resQuestions)
                                        let res = resQuestions.map(question => {
                                            return {
                                                id: question.id,
                                                type: question.typeAnswer == "multiple" || question.typeAnswer == "unique" 
                                                    ? "MCQ" : "TEXT",
                                                title: question.text,
                                                question: question.text,
                                                choices: question.choices && question.choices.map(choice => choice.text),
                                                choiceIds: question.choices && question.choices.map(choice => choice.id),
                                                answer: question.typeAnswer == "multiple" || question.typeAnswer == "unique" 
                                                    ? question.choices && question.choices.findIndex(choice => choice.correct)
                                                    : question.textAnswers && question.textAnswers.length && question.textAnswers[0],
                                                explanations: question.choices && question.choices.map(choice => "NONE"),
                                                justification: question.explication
                                            }
                                        })

                                        dispatch(openClassRoomServer(res, sessionId))
                                    }
                                })
                            })    
                        })
                    })
                })
            })
        })
        .catch(error => console.log(error))
    }
}

export function openClassRoomServer(quiz: Quiz[], sessionId) {
    return {
        type: OutMsgType.OPEN_ROOM,
        payload: { type: "CLASS", quiz, sessionId }
    }
}

export function closeRoom(roomId: number) {
    return {
        type: OutMsgType.CLOSE_ROOM,
        payload: { roomId }
    }
}