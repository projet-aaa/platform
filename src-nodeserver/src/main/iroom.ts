import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

export abstract class IRoom {

    id: number
    type: string
    server: any
    sockets: SocketInfo[]
    teacher: string

    sessionId: string
    iriSessionId: string

    get occupancy(): number { return this.sockets.length }

    constructor(server: any, id: number) {
        this.id = id
        this.server = server
        this.sockets = []
    }

    abstract receiveSocketMsg(socketInfo: SocketInfo, type: string, msg)

    abstract receiveRedisMsg(type: string, msg)

    abstract socketEnter(socketInfo: SocketInfo)
    abstract socketLeave(socketInfo: SocketInfo)
}

export abstract class IMainRoom extends IRoom {

    abstract socketGeneralEnter(socketInfo: SocketInfo)
    abstract socketGeneralLeave(socketInfo: SocketInfo)
}