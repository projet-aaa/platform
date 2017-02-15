import { IMainRoom } from '../main/iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { SocketInMsg, SocketOutMsg } from '../models/main'

export class MainRoom extends IMainRoom {

    type = RoomType.MAIN

    receiveSocketMsg(socket: SocketInfo, type: string, msg) {
        switch(type) {
            case SocketInMsg.AUTHENTIFY: {
                socket.id = msg.id
                socket.username = msg.username
                socket.isTeacher = msg.isTeacher
                break
            }
            case SocketInMsg.GET_ROOMS: {
                this.server.send(socket, SocketOutMsg.GET_ROOMS_RES, {
                    rooms: this.server.getRooms().slice(1)
                })
                break
            }
            case SocketInMsg.JOIN_ROOM: {
                this.server.changeSocketRoom(socket, msg.roomId)
                this.server.send(socket, SocketOutMsg.JOIN_ROOM_RES, { roomId: msg.roomId })
                break
            }
            case SocketInMsg.LEAVE_ROOM: {
                this.server.changeSocketRoom(socket, -1)
                this.server.send(socket, SocketOutMsg.LEAVE_ROOM_RES, { roomId: msg.roomId })
                break
            }
            case SocketInMsg.OPEN_ROOM: {
                let room = this.server.getRoomInfo(this.server.rooms[this.server.createRoom(msg.type)])
                for(let socket of this.sockets) {
                    this.server.send(socket, SocketOutMsg.ROOM_OPENED, { room: room })
                }
                break
            }
            case SocketInMsg.CLOSE_ROOM: {
                this.server.closeRoom(msg.roomId)
                for(let socket of this.sockets) {
                    this.server.send(socket, SocketOutMsg.ROOM_CLOSED, { roomId: msg.roomId })
                }
                break
            }
        }
    }

    receiveRedisMsg(type: string, msg) {
        
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