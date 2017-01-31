import { IMainRoom, SocketInfo } from './server'

export default class MainRoom extends IMainRoom {

    receive(socket: SocketInfo, type: string, msg) {

    }

    socketEnter(socket: SocketInfo) {
        
    }
    socketLeave(socket: SocketInfo) {
        
    }
    
    socketGeneralEnter(socketInfo: SocketInfo) {
        
    }
    socketGeneralLeave(socketInfo: SocketInfo) {

    }
}