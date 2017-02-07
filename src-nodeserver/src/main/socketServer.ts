import { IMainRoom, IRoom } from './iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { MainRoom } from '../rooms/mainRoom'

export class SocketServer {

    io
    redis
    rooms: IRoom[]
    mainRoom: IMainRoom

    nextId: number = 0

    log: boolean

    constructor(io, redis, log) {
        this.io = io
        this.redis = redis
        this.rooms = []
        this.mainRoom = new MainRoom(this, this.nextId++)

        this.log = log

        io.on('connection', socket => {
            let socketInfo = {
                id: -1,
                socket,
                roomId: -1,
                username: null,
                isTeacher: false
            }

            if(this.log)
                console.log('[connection]')

            this.mainRoom.socketGeneralEnter(socketInfo)
            this.mainRoom.socketEnter(socketInfo)
            this.mainRoom.sockets.push(socketInfo)

            socket.on('action', (action) => {
                let room: IRoom = this.rooms[socketInfo.roomId] 
                
                if(action.type.substring(0, 7) == "SERVER/"){
                    if(this.log) {
                        console.log('[socket msg in] source=', socketInfo, ' msg=', action)
                    }

                    if(room) {
                        room.receiveSocketMsg(socketInfo, action.type, action.payload)
                    }
                    this.mainRoom.receiveSocketMsg(socketInfo, action.type, action.payload)
                }
            })

            socket.on('disconnect', () => {
                if(this.log)
                    console.log('[disconnection] ', socketInfo)

                let room: IRoom = this.rooms[socketInfo.roomId] 

                if(room) {
                    let i = room.sockets.indexOf(socketInfo)
                    if(i >= 0) { room.sockets.splice(i, 1) }

                    room.socketLeave(socketInfo)
                }

                this.mainRoom.sockets.splice(this.mainRoom.sockets.indexOf(socketInfo), 1)
                this.mainRoom.socketLeave(socketInfo)
                this.mainRoom.socketGeneralLeave(socketInfo)
            });
        })

        redis.on('message', function(channel, data) {
            if(this.log)
                console.log('[redis msg] ', data)
            // TODO parse data and send it to the right room
        })
    }

    createRoom(type: number): number {
        let id = this.nextId++,
            room = null

        if(this.log)
            console.log('[create room] type=', type, ' id=', id)
            
        room.init(this)
        this.rooms[id] = room

        return id
    }
    closeRoom(roomId: number) {
        let room = this.rooms[roomId]

        if(this.log)
            console.log('[close room] type=', room.type, ' id=', room.id)

        for(let socket of room.sockets) {
            this.changeSocketRoom(socket, -1)
        }

        this.rooms[roomId] = null
    }

    changeSocketRoom(socketInfo: SocketInfo, roomId: number) {
        if(roomId != socketInfo.roomId) {
            let oldRoom = this.rooms[socketInfo.roomId],
                newRoom = this.rooms[roomId]

            if(this.log) {
                console.log(
                    '[room change] user=', socketInfo.username, 
                    ' old room type=', oldRoom.type, ' id=', oldRoom.id, 
                    ' new room type=', newRoom.type, ' id=', newRoom.id
                )
            }

            if(oldRoom) {
                let i = oldRoom.sockets.indexOf(socketInfo)
                oldRoom.sockets.splice(i, 1)
                oldRoom.socketLeave(socketInfo)
            }

            socketInfo.roomId = roomId

            newRoom.sockets.push(socketInfo)
            newRoom.socketEnter(socketInfo)
        }
    }

    send(socketInfo: SocketInfo, type: string, msg) {
        if(this.log)
            console.log('[socket msg out] dest=', socketInfo, ' type=', type + ' msg=', msg)
            
        socketInfo.socket.emit('action', { type: type, payload: msg })
    }

    getRooms(): RoomInfo[] {
        return this.rooms.map((room) => {
            return { 
                id: room.id,
                type: room.type,
                popStudent: room.sockets.length,
                popTeacher: room.sockets.length
            }
        })
    }
}