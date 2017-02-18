import { Action } from '../../utils'

export const OutMsgType = {
    GET_ROOMS: "SERVER/GET_ROOMS",
    JOIN_ROOM: "SERVER/JOIN_ROOM",
    LEAVE_ROOM: "SERVER/LEAVE_ROOM",

    OPEN_ROOM: "SERVER/OPEN_ROOM",
    CLOSE_ROOM: "SERVER/CLOSE_ROOM",

    ROOM_SUBSCRIBE: "SERVER/ROOM_SUBSCRIBE",
    ROOM_UNSUBSCRIBE: "SERVER/ROOM_UNSUBSCRIBE"
}

export const InMsgType = {
    GET_ROOMS_RES: "CLIENT/GET_ROOMS_RES",
    JOIN_ROOM_RES: "CLIENT/JOIN_ROOM_RES",
    LEAVE_ROOM_RES: "CLIENT/LEAVE_ROOM_RES",

    ROOM_OPENED: "CLIENT/ROOM_OPENED",
    ROOM_CLOSED: "CLIENT/ROOM_CLOSED"
}

export function getRooms(): Action<{}> {
    return {
        type: OutMsgType.GET_ROOMS,
        payload: {}
    }
}
export function subscribe(fetch: boolean) {
    return {
        type: OutMsgType.ROOM_SUBSCRIBE,
        payload: { fetch }
    }
}
export function unsubscribe() {
    return {
        type: OutMsgType.ROOM_UNSUBSCRIBE,
        payload: {}
    }
}

export function joinRoom(roomId: number): Action<{ roomId: number}> {
    return {
        type: OutMsgType.JOIN_ROOM,
        payload: { roomId }
    }
}

export function leaveRoom(): Action<{}> {
    return {
        type: OutMsgType.LEAVE_ROOM,
        payload: {} 
    }
}

export function openClassRoom() {
    return {
        type: OutMsgType.OPEN_ROOM,
        payload: { type: "CLASS" }
    }
}

export function closeRoom(roomId: number) {
    return {
        type: OutMsgType.CLOSE_ROOM,
        payload: { roomId }
    }
}