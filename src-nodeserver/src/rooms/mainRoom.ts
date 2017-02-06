import { IMainRoom, SocketInfo } from './iroom'

import { 
    MainInMsg, MainOutMsg,
    GetRoomAction, JoinRoomAction, LeaveRoomAction, CreateRoomAction, CloseRoomAction, 
    GetRoomResAction, NewRoomAction, OldRoomAction, AuthentifyAction
} from '../comm/actionTypes'

import {
    RoomType
} from '../../../src-hmi/src/models/server'

export class MainRoom extends IMainRoom {

    type: RoomType = RoomType.MAIN

    receive(socket: SocketInfo, type: string, msg) {
        switch(type) {
            case MainInMsg.AUTHENTIFY: {
                let m = <AuthentifyAction>msg

                socket.id = m.id
                
                break;
            }
            case MainInMsg.GET_ROOMS: {
                let m = <GetRoomAction>msg

                this.server.send(
                    socket, 
                    MainOutMsg.ROOMS, 
                    <GetRoomResAction>{
                        rooms: this.server.getRooms()
                    }
                )
                break;
            }
            case MainInMsg.JOIN_ROOM: {
                let m = <JoinRoomAction>msg
                
                this.server.changeSocketRoom(
                    socket, 
                    m.roomId
                )
                break;
            }
            case MainInMsg.LEAVE_ROOM: {
                let m = <LeaveRoomAction>msg
                
                this.server.changeSocketRoom(
                    socket, 
                    -1
                )
                break;
            }
            case MainInMsg.CLOSE_ROOM: {
                let m = <CloseRoomAction>msg
                
                this.server.closeRoom(m.roomId)
                for(let s of this.sockets) {
                    this.server.send(
                        s,
                        MainOutMsg.OLD_ROOM,
                        <OldRoomAction>{
                            roomId: m.roomId
                        }
                    )
                }
                break;
            }
            case MainInMsg.CREATE_ROOM: {
                let m = <CreateRoomAction>msg
                
                let id: number = this.server.createRoom(RoomType.CLASS)
                for(let s of this.sockets) {
                    this.server.send(
                        s,
                        MainOutMsg.NEW_ROOM,
                        <NewRoomAction>{
                            room: {
                                id: id,
                                type: RoomType.CLASS
                            }
                        }
                    )
                }
                break;
            }
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