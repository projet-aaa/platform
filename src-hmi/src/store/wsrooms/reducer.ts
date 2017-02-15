import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { InMsgType } from "./actions"

import { RoomInfo } from '../../models/wsServer/server'

interface WSRoomState {
    rooms: RoomInfo[]
    currentRoom: RoomInfo
}

let initialState: WSRoomState = {
    rooms: [],
    currentRoom: null
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
            currentRoom: null
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
            })
        })
    }
}, initialState);

export default { [name]: reducer }