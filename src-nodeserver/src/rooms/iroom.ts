import { RoomType } from '../../../src-hmi/src/models/server'

export interface SocketInfo {

    socket
    id: number
    roomId: number
}

export abstract class IRoom {

    id: number
    type: RoomType
    server: any
    sockets: SocketInfo[]

    get occupancy(): number { return this.sockets.length }

    constructor(server: any, id: number) {
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