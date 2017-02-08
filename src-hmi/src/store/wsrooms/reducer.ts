import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { InMsgType } from "./actions"

import { RoomInfo } from '../../models/wsServer/server'

interface WSRoomInfo {
    rooms: RoomInfo[]
    currentRoom: RoomInfo
}

let initialState: WSRoomInfo = {
    rooms: [],
    currentRoom: null
}

const name = "wsserver"
const reducer = handleActions({
    [InMsgType.JOIN_ROOM_RES]: function(state: WSRoomInfo, action: any): WSRoomInfo {
        return Object.assign({}, state, {
            currentRoom: action.payload.roomId
        })
    },
    [InMsgType.GET_ROOMS_RES]: function(state: WSRoomInfo, action: any): WSRoomInfo {
        return Object.assign({}, state, {
            rooms: action.payload.rooms
        })
    },
    [InMsgType.LEAVE_ROOM_RES]: function(state: WSRoomInfo, action: any): WSRoomInfo {
        return Object.assign({}, state, {
            currentRoom: null
        })
    }
}, initialState);

export default { [name]: reducer }