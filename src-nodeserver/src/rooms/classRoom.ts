import { IRoom } from '../main/iroom'
import { SocketInfo, RoomInfo, RoomType } from '../models/rooms'

import { RedisMsg } from '../models/class'

export class ClassRoom extends IRoom {

    type = RoomType.CLASS

    receiveSocketMsg(socket: SocketInfo, type: string, msg) {
        
    }

    receiveRedisMsg(type: string, msg) {
        switch(type) {
            // STUDENT
            case RedisMsg.ANSWER: {

                break;
            }
            case RedisMsg.SIGNAL_STATE: {

                break;
            }
            // TEACHER
            case RedisMsg.LAUNCH_QUIZ: {

                break;
            }
            case RedisMsg.FINISH_QUIZ: {

                break;
            }
        }
    }

    socketEnter(socket: SocketInfo) {
        
    }
    socketLeave(socket: SocketInfo) {
        
    }
}