import { Action } from "../../utils/";
import { ActionTypes, APIActionTypes } from "./actions";
import { handleActions } from "redux-actions";

import { Session, SessionType } from "../../models/session"

export interface SessionState {
    sessions: {}
}

let initialState: SessionState = {
    sessions: {
        ["0"]: {
            id: "0",
            sessionName: "CM2",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        ["1"]: {
            id: "1",
            sessionName: "CM3",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: true
        },
        ["2"]: {
            id: "2",
            sessionName: "CM1",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        ["3"]: {
            id: "3",
            sessionName: "TD1",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        ["4"]: {
            id: "4",
            sessionName: "TD2",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        ["5"]: {
            id: "5",
            sessionName: "TD3",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        ["6"]: {
            id: "6",
            sessionName: "TP3",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        ["7"]: {
            id: "7",
            sessionName: "TP2",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: true
        },
        ["8"]: {
            id: "8",
            sessionName: "TP1",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,1),
            discipline: "TOB",
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