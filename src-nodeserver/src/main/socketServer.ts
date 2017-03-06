import { IMainRoom, IRoom } from './iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { MainRoom } from '../rooms/mainRoom'
import { ClassRoom } from '../rooms/classRoom'

import { SocketOutMsg } from '../models/main'

/* SOCKET SERVER
 * Handles the basic communication, connection and disconnection
 */
export class SocketServer {
    io
    redis
    rooms: IRoom[]
    mainRoom: IMainRoom

    nextId: number = 0

    log: boolean

    // Requires the io server, the redis client and a boolean signalling whether we need to log information or not
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
                isTeacher: false,
                subscribed: false
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
                        console.log('[socket msg in] source=', socketInfo.username, '[', socketInfo.id, '] msg=', action)
                    }

                    if(room) {
                        room.receiveSocketMsg(socketInfo, action.type, action.payload)
                    }
                    this.mainRoom.receiveSocketMsg(socketInfo, action.type, action.payload)
                }
            })

            socket.on('disconnect', () => {
                if(this.log)
                    console.log('[disconnection] username=', socketInfo.username)

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

        redis.on('message', (channel, data) => {
            if(this.log)
                console.log('[redis msg] ', data)
            // TODO parse data and send it to the right room
            
        })
    }

    createRoom(type: string, teacher: string, msg): number {
        let id = this.nextId++,
            room = null

        if(this.log)
            console.log('[create room] type=', type, ' id=', id)

        switch(type) {
            default: {
                room = new ClassRoom(this, id)
                if(msg.sessionId) {
                    let quizs = {}
                    for(let quiz of msg.quiz) {
                        quizs[quiz.id] = quiz
                    }
                    (room as ClassRoom).quiz = quizs
                }
                break
            }
        }

        room.sessionId = msg.sessionId
        room.iriSessionId = msg.iriSessionId
        this.rooms[id] = room
        
        room.teacher = teacher

        return id
    }
    closeRoom(roomId: number) {
        let room = this.rooms[roomId]

        if(room) {
            if(this.log)
                console.log('[close room] type=', room.type, 'id=', room.id)

            for(let socket of room.sockets) {
                this.changeSocketRoom(socket, -1)
                this.send(socket, SocketOutMsg.ROOM_CLOSED, { roomId: roomId })
            }

            this.rooms.splice(this.rooms.indexOf(room), 1)
        }
    }

    changeSocketRoom(socketInfo: SocketInfo, roomId: number) {
        if(roomId != socketInfo.roomId) {
            let oldRoom = this.rooms[socketInfo.roomId],
                newRoom = this.rooms[roomId]

            if(this.log) {
                console.log(
                    '[room change] username=', socketInfo.username, 
                    'old room=', this.getRoomInfo(oldRoom),
                    'new room=', this.getRoomInfo(newRoom)
                )
            }

            if(oldRoom) {
                let i = oldRoom.sockets.indexOf(socketInfo)
                oldRoom.sockets.splice(i, 1)
                oldRoom.socketLeave(socketInfo)
            }

            socketInfo.roomId = roomId

            if(newRoom) {
                newRoom.sockets.push(socketInfo)
                newRoom.socketEnter(socketInfo)
            }
        }
    }

    send(socketInfo: SocketInfo, type: string, msg) {
        if(this.log)
            console.log('[socket msg out] dest=', socketInfo.username, '[', socketInfo.id, '] type=', type + ' msg=', msg)
            
        socketInfo.socket.emit('action', { type: type, payload: msg })
    }

    getRooms(): RoomInfo[] {
        return this.rooms.filter(room => { return room }).map(room => {
            return this.getRoomInfo(room)
        })
    }
    getRoomInfo(room: IRoom): RoomInfo {
        if(room) {
            return { 
                id: room.id,
                type: room.type,
                popStudent: room.sockets.length,
                popTeacher: room.sockets.length,
                teacher: room.teacher,
                sessionId: room.sessionId
            }
        }
    }
}