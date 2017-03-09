export const RoomType = {
    CHAT: "CHAT", 
    CLASS: "CLASS", 
    MAIN: "MAIN"
} 

export interface RoomInfo {
    id: number
    sessionId: string
    sessionName: string
    type: string
    popStudent: number
    popTeacher: number
    teacher: string
}

export const CONNECTION_STATE = {
    NONE: 0,
    AUTHENTIFYING: 1,
    AUTHENTIFIED: 2,
    JOINING: 3,
    IN_ROOM: 4
}