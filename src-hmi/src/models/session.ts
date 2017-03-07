export const SessionType = {
    CM: 'CM',
    TD: 'TD',
    TP: 'TP'
}

export interface Session {
    id: string
    // the name of the session
    sessionName: string
    // the type of session
    sessionType: string
    // the date of the session
    date: Date
    // the discipline this session belongs to
    discipline: string
    // The tacher for this session
    teacherName: string
    // If the session is running live
    live: boolean
}