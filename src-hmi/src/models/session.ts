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
    updatedAt: Date
    // the discipline this session belongs to
    discipline: string
}