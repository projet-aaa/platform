import { viewTestFactory } from '../../utils'

import { View, Props } from '../../views/main/mainView'
import { Session, SessionType } from '../../models/class/class'

viewTestFactory<Props>(View, {
    sessions: [
        {
            sessionName: "CM2",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        {
            sessionName: "CM3",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: true
        },
        {
            sessionName: "CM1",
            teacherName: "PANTEL",
            sessionType: SessionType.CM,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        {
            sessionName: "TD1",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
        {
            sessionName: "TD2",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: false
        },
        {
            sessionName: "TD3",
            teacherName: "PANTEL",
            sessionType: SessionType.TD,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        {
            sessionName: "TP3",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,3),
            discipline: "TOB",
            live: false
        },
        {
            sessionName: "TP2",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,2),
            discipline: "TOB",
            live: true
        },
        {
            sessionName: "TP1",
            teacherName: "PANTEL",
            sessionType: SessionType.TP,
            date: new Date(2017,0,1),
            discipline: "TOB",
            live: false
        },
    ],
    disciplines: ["TOB", "PF", "PIM", "A", "B", "C", "D", "AZERTYUIOPQSDFGHJKLMWXCVBN"]
})