import { IMainRoom } from '../main/iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { SocketInMsgType, SocketOutMsgType, RedisMsgType } from '../models/main'

export class MainRoom extends IMainRoom {

    type = RoomType.MAIN

    receiveSocketMsg(socket: SocketInfo, type: string, msg) {
        switch(type) {
            case SocketInMsgType.GET_ROOMS: {
                this.server.send(socket, SocketOutMsgType.GET_ROOMS_RES, {
                    rooms: this.server.getRooms()
                })
                break;
            }
            case SocketInMsgType.JOIN_ROOM: {
                this.server.changeSocketRoom(socket, msg.roomId)
                break;
            }
            case SocketInMsgType.LEAVE_ROOM: {
                this.server.changeSocketRoom(socket, -1)
                break;
            }
            default: {
                console.log('[ERROR] unhandled socket msg in main: type=', type, ' msg=', msg)
                break;
            }
        }
    }

    receiveRedisMsg(type: string, msg) {
        switch(type) {
            case RedisMsgType.CREATE_ROOM: {
                this.server.createRoom(msg.type)
                break
            }
            case RedisMsgType.CLOSE_ROOM: {
                this.server.closeRoom(msg.roomId)
                break
            }
            default: {
                console.log('[ERROR] unhandled redis msg in main: type=', type, ' msg=', msg)
                break
            }
        }
    }

    socketEnter(socket: SocketInfo) {
        
    }
    socketLeave(socket: SocketInfo) {
        
    }
    
    socketGeneralEnter(socket: SocketInfo) {
        
    }
    socketGeneralLeave(socket: SocketInfo) {
        
    }
}