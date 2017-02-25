import { handleActions } from "redux-actions"

import { Action } from "../../utils"
import { InMsgType, OutMsgType } from "./actions"
import { WSOutActionTypes } from "../auth/actions"

import { RoomInfo, CONNECTION_STATE } from '../../models/wsServer/server'

export interface WSRoomState {
    rooms: RoomInfo[]
    currentRoom: number
    state: number
}

let initialState: WSRoomState = {
    rooms: [],
    currentRoom: -1,
    state: CONNECTION_STATE.NONE
}

const name = "wsserver"
const reducer = handleActions({
    [WSOutActionTypes.AUTH]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            state: CONNECTION_STATE.AUTHENTIFYING
        })
    },
    [OutMsgType.JOIN_ROOM]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            state: CONNECTION_STATE.JOINING
        })
    },
    [InMsgType.AUTHENTIFIED]: function(state: WSRoomState, action): WSRoomState {
        return Object.assign({}, state, {
            state: CONNECTION_STATE.AUTHENTIFIED
        })
    },
    [InMsgType.JOIN_ROOM_RES]: function(state: WSRoomState, action: any): WSRoomState {
        return Object.assign({}, state, {
            currentRoom: action.payload.roomId,
            state: CONNECTION_STATE.IN_ROOM
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
        let currentRoomClosed = state.currentRoom == action.payload.roomId
        return Object.assign({}, state, {
            rooms: state.rooms.filter(room => {
                return action.payload.roomId != room.id
            }),
            currentRoom: currentRoomClosed ? -1 : state.currentRoom,
            state: currentRoomClosed ? CONNECTION_STATE.AUTHENTIFIED : state.state
        })
    }
}, initialState);

export default { [name]: reducer }