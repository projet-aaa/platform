export const SocketInMsgType = {
    GET_ROOMS: "SERVER/GET_ROOMS",
    JOIN_ROOM: "SERVER/JOIN_ROOM",
    LEAVE_ROOM: "SERVER/LEAVE_ROOM"
}

export const SocketOutMsgType = {
    GET_ROOMS_RES: "CLIENT/GET_ROOMS_RES",
    JOIN_ROOM_RES: "CLIENT/JOIN_ROOM_RES",
    LEAVE_ROOM_RES: "CLIENT/LEAVE_ROOM_RES"
}

export const RedisMsgType = {
    CREATE_ROOM: "1",
    CLOSE_ROOM: "2"
}