import { IRoom, SocketInfo } from './server'

export default class ChatRoom extends IRoom {

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