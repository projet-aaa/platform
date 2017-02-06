import { IRoom, SocketInfo } from './iroom'

import { RoomType } from '../../../src-hmi/src/models/server'

export class ChatRoom extends IRoom {

    type: RoomType = RoomType.CHAT

    receive(socket: SocketInfo, type: string, msg) {
        for(let socket of this.sockets) {
            this.server.send(socket, type, msg)
        }
    }

    socketEnter(socket: SocketInfo) {

    }
    socketLeave(socket: SocketInfo) {

    }
}