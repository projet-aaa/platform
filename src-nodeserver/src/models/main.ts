// MAIN COMMUNICATION PROTOCOL

export const SocketInMsg = {
    /* AUTHENTIFY
     * id: number
     * username: string
     * isTeacher: boolean
     */
    AUTHENTIFY: "SERVER/AUTHENTIFY",

    GET_ROOMS: "SERVER/GET_ROOMS",
    /* JOIN ROOM
     * auto: boolean -> allows a teacher to join the room with his name
     * or
     * roodId: number
     */
    JOIN_ROOM: "SERVER/JOIN_ROOM",
    LEAVE_ROOM: "SERVER/LEAVE_ROOM",

    /* OPEN ROOM (opens it to the name if the person sending the request)
     * roodId: number
     * type: string (CLASS to create a class)
     * quiz: Quiz[]
     * sessionId: string
     * iriSessionId: string
     */
    OPEN_ROOM: "SERVER/OPEN_ROOM",
    /* CLOSE ROOM
     * roomProf: string
     */
    CLOSE_ROOM: "SERVER/CLOSE_ROOM",

    /* ROOM SUBSCRIBE (signal that the socket wishes to receive updates on which rooms are open)
     * fetch: boolean (signals if you want to get all the rooms currently open)
     */
    ROOM_SUBSCRIBE: "SERVER/ROOM_SUBSCRIBE",
    ROOM_UNSUBSCRIBE: "SERVER/ROOM_UNSUBSCRIBE"
}

export const SocketOutMsg = {
    AUTHENTIFIED: "CLIENT/AUTHENTIFIED",

    /* GET ROOM RESULT
     * rooms: RoomInfo[]
     */
    GET_ROOMS_RES: "CLIENT/GET_ROOMS_RES",
    /* JOIN ROOM RESULT
     * roomId: string
     */
    JOIN_ROOM_RES: "CLIENT/JOIN_ROOM_RES",
    LEAVE_ROOM_RES: "CLIENT/LEAVE_ROOM_RES",

    /* ROOM OPENED RESULT
     * room: RoomInfo
     */
    ROOM_OPENED: "CLIENT/ROOM_OPENED",
    /* ROOM CLOSED RESULT
     * roomId: number
     */
    ROOM_CLOSED: "CLIENT/ROOM_CLOSED"
}