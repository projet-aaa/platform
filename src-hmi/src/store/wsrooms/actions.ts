import { Action } from '../../utils'

export const OutMsgType = {
    GET_ROOMS: "SERVER/GET_ROOMS",
    JOIN_ROOM: "SERVER/JOIN_ROOM",
    LEAVE_ROOM: "SERVER/LEAVE_ROOM"
}

export const InMsgType = {
    GET_ROOMS_RES: "CLIENT/GET_ROOMS_RES",
    JOIN_ROOM_RES: "CLIENT/JOIN_ROOM_RES",
    LEAVE_ROOM_RES: "CLIENT/LEAVE_ROOM_RES"
}

export function getRoomsAction(): Action<{}> {
    return {
        type: OutMsgType.GET_ROOMS,
        payload: {}
    }
}

export function joinRoomAction(roomId: number): Action<{ roomId: number}> {
    return {
        type: OutMsgType.JOIN_ROOM,
        payload: { roomId }
    }
}

export function leaveRoomAction(): Action<{}> {
    return {
        type: OutMsgType.LEAVE_ROOM,
        payload: {} 
    }
}