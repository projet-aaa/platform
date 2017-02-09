export const RoomType = {
    CHAT: "CHAT", 
    CLASS: "CLASS", 
    MAIN: "MAIN"
}

export interface SocketInfo {
    socket

    id: number
    username: string
    isTeacher: boolean
    roomId: number
}

export interface RoomInfo {
    id: number
    type: string
    popStudent: number
    popTeacher: number
}