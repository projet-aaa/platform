import ChatRoom from './chatServerRoom'
import MainRoom from './mainServerRoom'

export class Server {

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

            socket.on('action', function(action) {
                let room: IRoom = socketInfo.room == -1 ? this.mainRoom : this.rooms[socketInfo.room] 
                
                if(action.type.substring(0, 7) == "SERVER/"){  
                    room.receive(socketInfo, action.type, action.payload)
                }
            })

            socket.on('disconnect', function () {
                let room: IRoom = socketInfo.room == -1 ? this.mainRoom : this.rooms[socketInfo.room] 

                let i = room.sockets.indexOf(socketInfo)
                if(i >= 0) { room.sockets.splice(i, 1) }

                this.room.socketLeave(socketInfo)
                this.mainRoom.socketGeneralLeave(socketInfo)
            });
        })
    }

    createRoom(type: string): number {
        let id = this.nextId++,
            room = null
        switch(type) {
            default: room = new ChatRoom(this, id); break;
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
}

export interface SocketInfo {

    socket
    room: number
}

export abstract class IRoom {

    id: number
    server: Server
    sockets: SocketInfo[]

    get occupancy(): number { return this.sockets.length }

    constructor(server: Server, id: number) {
        this.id = id
        this.server = server
        this.sockets = []
    }

    abstract receive(socketInfo: SocketInfo, type: string, msg)

    abstract socketEnter(socketInfo: SocketInfo)
    abstract socketLeave(socketInfo: SocketInfo)
}

export abstract class IMainRoom extends IRoom {

    abstract socketGeneralEnter(socketInfo: SocketInfo)
    abstract socketGeneralLeave(socketInfo: SocketInfo)
}