import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { InMsgType } from "./actions"

import { RoomInfo } from '../../models/wsServer/server'

interface WSRoomState {
    rooms: RoomInfo[]
    currentRoom: number
}

let initialState: WSRoomState = {
    rooms: [],
    currentRoom: -1
}

const name = "wsserver"
const reducer = handleActions({
    [InMsgType.JOIN_ROOM_RES]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            currentRoom: action.payload.roomId
        })
    },
    [InMsgType.GET_ROOMS_RES]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            rooms: action.payload.rooms
        })
    },
    [InMsgType.LEAVE_ROOM_RES]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            currentRoom: -1
        })
    },
    [InMsgType.ROOM_OPENED]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            rooms: state.rooms.concat(action.payload.room)
        })
    },
    [InMsgType.ROOM_CLOSED]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            rooms: state.rooms.filter(room => {
                action.payload.roomId != room.id
            }),
            currentRoom: state.currentRoom == action.payload.roomId ? -1 : state.currentRoom
        })
    }
}, initialState);

export default { [name]: reducer }