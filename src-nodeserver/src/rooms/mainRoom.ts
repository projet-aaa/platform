import { IMainRoom, SocketInfo } from './iroom'

let MainInMsg = {
    GET_ROOMS: "SERVER/GET_ROOMS",
    JOIN_ROOM: "SERVER/JOIN_ROOM",
    LEAVE_ROOM: "SERVER/LEAVE_ROOM",

    CREATE_ROOM: "SERVER/CREATE_ROOM",
    CLOSE_ROOM: "SERVER/CLOSE_ROOM"
}

let MainOutMsg = {
    ROOMS: "SS/ROOMS",
    NEW_ROOM: "SS/ROOM"
}

export class MainRoom extends IMainRoom {

    type: string = "MAIN"

    receive(socket: SocketInfo, type: string, msg) {
        switch(type) {
            case MainInMsg.GET_ROOMS:
                this.server.send(socket, MainOutMsg.ROOMS, this.server.getRooms())
                break;
            case MainInMsg.JOIN_ROOM:
                this.server.changeSocketRoom(socket, msg.room)
                break;
            case MainInMsg.LEAVE_ROOM:
                this.server.changeSocketRoom(socket, -1)
                break;
            case MainInMsg.CLOSE_ROOM:
                this.server.closeRoom(msg.room)
                break;
            case MainInMsg.CREATE_ROOM:
                let id = this.server.createRoom(msg.roomType)
                this.server.send(socket, MainOutMsg.NEW_ROOM, { room: id })
                break;
        }
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