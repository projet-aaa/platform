export const RoomType = {
    CHAT: "CHAT", 
    CLASS: "CLASS", 
    MAIN: "MAIN"
} 

export interface RoomInfo {
    id: number
    type: string
    popStudent: number
    popTeacher: number
    teacher: string
}