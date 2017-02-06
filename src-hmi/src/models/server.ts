export enum RoomType {
    CHAT, CLASS, MAIN
} 

export interface RoomInfo {
    id: number
    type: RoomType
}