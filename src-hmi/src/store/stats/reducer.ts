import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { APIActionTypes, ActionTypes } from "./actions"

import { Quiz, QuizType } from "../../models/class/class"
import { Session } from '../../models/session'

export interface StatState {
    panic: number[]
    tooSlow: number[]
    tooFast: number[]
    date: number[]

    comments: {
        comment: string
        commenter: string
        date: Date    
    }[]

    quiz: Quiz[]
    quizChoices: any[]

    currentQuizId: string

    sessionIds: number[]
}

let initialState: StatState = {
    panic: [10, 20, 20, 20, 30, 20],
    tooSlow: [5, 10, 20, 30, 10, 2],
    tooFast: [ 2, 2, 2, 2, 2, 3],
    date: [0, 5, 10, 15, 20, 25],
    comments: [
        {
            date: new Date(),
            comment: "J'ai pas compris",
            commenter: "Jules"
        },
        {
            date: new Date(2017, 1, 25, 24, 3),
            comment: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
            commenter: "Jules"
        }
    ],

    quiz: [
        {
            id: "0",
            type: QuizType.MCQ,
            title: "La question à mille rouble",
            question: "Est ce que je ok?",
            choices: ["peut être", "mr l'arbitre", "oui", "D"],
            choiceIds: ["0", "1", "2"],
            explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
            answer: 3
        }, {
            id: "1",
            type: QuizType.MCQ,
            title: "La question facile",
            question: "Est ce que je ok?",
            choices: ["peut être", "mr l'arbitre", "oui", "D"],
            choiceIds: ["0", "1", "2"],
            explanations: ["peut-être que c'est faux", "aux chiottes l'arbitre", "NON !!!!!!!!!", "Voilà !"],
            answer: 3
        }
    ],
    quizChoices: [
        {
            "peut être": 3,
            "mr l'arbitre": 10    
        }
    ],
    currentQuizId: "0",

    sessionIds: [
        0, 1
    ]
}

const name = "stat"
const reducer = handleActions({
    ["jamais"]: function(state: StatState, action: any): StatState {
        return state
    }
}, initialState);

export default { [name]: reducer }