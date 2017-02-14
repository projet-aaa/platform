export const SessionType = {
    CM: 'CM',
    TD: 'TD',
    TP: 'TP'
}

export interface Session {
    id: number
    // the name of the session
    sessionName: string
    // the name of the teacher
    teacherName: string
    // the type of session
    sessionType: string
    // the date of the session
    date: Date,
    // the discipline this session belongs to
    discipline: string
    // true if a live of this session is going on actually
    live: boolean
}