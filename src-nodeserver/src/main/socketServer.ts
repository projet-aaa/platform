import { IRoom, IMainRoom, SocketInfo } from '../rooms/iroom'
import { MainRoom } from '../rooms/mainRoom'
import { ChatRoom } from '../rooms/chatRoom'
import { ClassRoom } from '../rooms/classRoom'

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
                socket,
                room: -1
            }
            this.sockets.push(socketInfo)
            this.mainRoom.socketGeneralEnter(socketInfo)
            this.mainRoom.socketEnter(socketInfo)
            this.mainRoom.sockets.push(socketInfo)

            socket.on('action', (action) => {
                let room: IRoom = socketInfo.room == -1 ? this.mainRoom : this.rooms[socketInfo.room] 
                
                if(action.type.substring(0, 7) == "SERVER/"){  
                    room.receive(socketInfo, action.type, action.payload)
                }
            })

            socket.on('disconnect', () => {
                let room: IRoom = socketInfo.room == -1 ? this.mainRoom : this.rooms[socketInfo.room] 

                let i = room.sockets.indexOf(socketInfo)
                if(i >= 0) { room.sockets.splice(i, 1) }

                this.sockets.splice(this.sockets.indexOf(socketInfo), 1)

                room.socketLeave(socketInfo)
                this.mainRoom.socketGeneralLeave(socketInfo)
            });
        })
    }

    createRoom(type: string): number {
        let id = this.nextId++,
            room = null
        switch(type) {
            case "CHAT": room = new ChatRoom(this, id); break;
            case "QUIZ": room = new ClassRoom(this, id); break;
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

    changeSocketRoom(socketInfo: SocketInfo, room: number) {
        if(room != socketInfo.room) {
            let oldRoom = room == -1 ? this.rooms[socketInfo.room] : this.mainRoom,
                newRoom = room == -1 ? this.mainRoom : this.rooms[socketInfo.room],
                i = oldRoom[socketInfo.room].sockets.indexOf(socketInfo)

            if(i >= 0) { oldRoom[socketInfo.room].sockets.splice(i, 1) }

            newRoom.sockets.push(socketInfo)

            socketInfo.room = room
            
            oldRoom.socketLeave(socketInfo)
            newRoom.socketEnter(socketInfo)
        }
    }

    send(socketInfo: SocketInfo, type: string, msg) {
        socketInfo.socket.emit('action', { type: type, payload: msg })
    }

    getRooms(): any[] {
        return this.rooms.map((room) => {
            return { 
                id: room.id,
                type: room.type  
            }
        })
    }
}