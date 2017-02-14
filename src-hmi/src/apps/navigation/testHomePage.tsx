import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/main/mainView'
import { Session, SessionType } from '../../models/session'

viewTestFactory<Props>(View, {
    sessions: [
        {
            id: 0,
            sessionName: "CM2",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        {
            id: 0,
            sessionName: "CM3",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: true
        },
        {
            id: 0,
            sessionName: "CM1",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        {
            id: 0,
            sessionName: "TD1",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        {
            id: 0,
            sessionName: "TD2",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        {
            id: 0,
            sessionName: "TD3",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        {
            id: 0,
            sessionName: "TP3",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        {
            id: 0,
            sessionName: "TP2",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: true
        },
        {
            id: 0,
            sessionName: "TP1",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        }
    ],
    disciplines: ["TOB", "PF", "PIM", "A", "B", "C", "D", "AZERTYUIOPQSDFGHJKLMWXCVBN"]
})