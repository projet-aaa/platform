import { IRoom, IMainRoom, SocketInfo } from '../rooms/iroom'
import { MainRoom } from '../rooms/mainRoom'
import { ChatRoom } from '../rooms/chatRoom'
import { ClassRoom } from '../rooms/classRoom'

import { RoomInfo, RoomType } from '../../../src-hmi/src/models/server'

export class SocketServer {

    io
    sockets: SocketInfo[]
    rooms: IRoom[]
    mainRoom: IMainRoom

    nextId: number = 0

    constructor(io) {
        this.io = io
        this.sockets = []
        this.rooms = []
        this.mainRoom = new MainRoom(this, this.nextId++)

        io.on('connection', socket => {
            let socketInfo = {
                id: -1,
                socket,
                roomId: -1
            }
            this.sockets.push(socketInfo)
            this.mainRoom.socketGeneralEnter(socketInfo)
            this.mainRoom.socketEnter(socketInfo)
            this.mainRoom.sockets.push(socketInfo)

            socket.on('action', (action) => {
                let room: IRoom = socketInfo.roomId == -1 ? this.mainRoom : this.rooms[socketInfo.roomId] 
                
                if(action.type.substring(0, 7) == "SERVER/"){  
                    room.receive(socketInfo, action.type, action.payload)
                }
            })

            socket.on('disconnect', () => {
                let room: IRoom = socketInfo.roomId == -1 ? this.mainRoom : this.rooms[socketInfo.roomId] 

                let i = room.sockets.indexOf(socketInfo)
                if(i >= 0) { room.sockets.splice(i, 1) }

                this.sockets.splice(this.sockets.indexOf(socketInfo), 1)

                room.socketLeave(socketInfo)
                this.mainRoom.socketGeneralLeave(socketInfo)
            });
        })
    }

    createRoom(type: number): number {
        let id = this.nextId++,
            room = null
        switch(type) {
            case RoomType.CHAT: room = new ChatRoom(this, id); break;
            case RoomType.CLASS: room = new ClassRoom(this, id); break;
        }
        room.init(this)
        this.rooms[id] = room

        return id
    }
    closeRoom(roomId: number) {
        let room = this.rooms[roomId]

        for(let socket of room.sockets) {
            this.changeSocketRoom(socket, -1)
        }

        this.rooms[roomId] = null
    }

    changeSocketRoom(socketInfo: SocketInfo, roomId: number) {
        if(roomId != socketInfo.roomId) {
            let oldRoom = roomId == -1 ? this.rooms[socketInfo.roomId] : this.mainRoom,
                newRoom = roomId == -1 ? this.mainRoom : this.rooms[socketInfo.roomId],
                i = oldRoom[socketInfo.roomId].sockets.indexOf(socketInfo)

            if(i >= 0) { oldRoom[socketInfo.roomId].sockets.splice(i, 1) }

            newRoom.sockets.push(socketInfo)

            socketInfo.roomId = roomId
            
            oldRoom.socketLeave(socketInfo)
            newRoom.socketEnter(socketInfo)
        }
    }

    send(socketInfo: SocketInfo, type: string, msg) {
        socketInfo.socket.emit('action', { type: type, payload: msg })
    }

    getRooms(): RoomInfo[] {
        return this.rooms.map((room) => {
            return { 
                id: room.id,
                type: room.type  
            }
        })
    }
}