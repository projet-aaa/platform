import { IMainRoom, SocketInfo } from '../main/iroom'

export class MainRoom extends IMainRoom {

    receive(socket: SocketInfo, type: string, msg) {
        
    }

    socketEnter(socket: SocketInfo) {
        console.log("enter main room: " + socket)
    }
    socketLeave(socket: SocketInfo) {
        console.log("leave main room: " + socket)
    }
    
    socketGeneralEnter(socket: SocketInfo) {
        console.log("connection: " + socket)
    }
    socketGeneralLeave(socket: SocketInfo) {
        console.log("disconnection: " + socket)
    }
}