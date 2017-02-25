import { Action } from "../../utils/";
import { ActionTypes, APIActionTypes } from "./actions";
import { handleActions } from "redux-actions";

import { Session, SessionType } from "../../models/session"

export interface SessionState {
    sessions: {}
}

let initialState: SessionState = {
    sessions: {
        ["TOB0"]: {
            id: "0",
            sessionName: "CM2 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        ["TOB1"]: {
            id: "1",
            sessionName: "CM3 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: true
        },
        ["TOB2"]: {
            id: "2",
            sessionName: "CM1 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        ["TOB3"]: {
            id: "3",
            sessionName: "TD1 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        ["TOB4"]: {
            id: "4",
            sessionName: "TD2 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        ["TOB5"]: {
            id: "5",
            sessionName: "TD3 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        ["TOB6"]: {
            id: "6",
            sessionName: "TP3 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        ["TOB7"]: {
            id: "7",
            sessionName: "TP2 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: true
        },
        ["TOB8"]: {
            id: "8",
            sessionName: "TP1 TOB",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        ["PIM0"]: {
            id: "9",
            sessionName: "TP1 PIM",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,1),
            discipline: "PIM",
            live: true
        },
        ["PIM1"]: {
            id: "10",
            sessionName: "TP2 PIM",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,2),
            discipline: "PIM",
            live: false
        },
        ["PF0"]: {
            id: "11",
            sessionName: "CM1 PF",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,1),
            discipline: "PF",
            live: true
        },
        ["PF1"]: {
            id: "12",
            sessionName: "CM2 PF",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,2),
            discipline: "PF",
            live: false
        }
    }
}

const name = "sessions"
const reducer = handleActions({
    ["jamais"]: function(state: SessionState, action: any) {
        return state
    }
}, initialState)

export default { [name]: reducer }