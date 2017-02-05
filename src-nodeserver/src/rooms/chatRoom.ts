import { IRoom, SocketInfo } from './iroom'

export class ChatRoom extends IRoom {

    type: string = "CHAT"

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