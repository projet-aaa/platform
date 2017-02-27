import { connect } from "react-redux"

import rootWrapper from "./rootWrapper"

import { AuthState } from "../store/auth/reducer" 
import { WSRoomState } from "../store/wsrooms/reducer"

import { joinRoom, openClassRoom, openClassRoomServer, subscribe } from "../store/wsrooms/actions"
import { authWS } from "../store/auth/actions"

import { CONNECTION_STATE } from "../models/wsServer/server"

export default function connectionWrapper(View) {
    function mapStateToProps(state, ownProps) {
        let auth: AuthState = state.auth,
            wsrooms: WSRoomState = state.wsserver,
            teacher = ownProps.params.profName,
            currentRoom = wsrooms.currentRoom ? 
                wsrooms.rooms.find(room => wsrooms.currentRoom == room.id) : null

        return {
            id: auth.id,
            username: auth.username,
            isTeacher: auth.isTeacher,
            teacher,
            rooms: wsrooms.rooms,
            currentRoom,
            isConnected: currentRoom != null, 
            connectionState: wsrooms.state
        }
    }

    function mapDispatchToProps(dispatch, ownProps) {
        return {
            subscribe: () => dispatch(subscribe(true)),
            authWS: (id, username, isTeacher) => dispatch(authWS(id, username, isTeacher)),
            joinRoom: (roomId: number) => dispatch(joinRoom(roomId)),
            createRoom: () => dispatch(openClassRoom(ownProps.params.course))
        }
    }
    let lock = false
    function mergeProps(sp, dp, op) {
        switch(sp.connectionState) {
            case CONNECTION_STATE.AUTHENTIFIED: {
                let room = sp.rooms.find(room => room.teacher == sp.teacher)
                if(room) { 
                    dp.joinRoom(room.id) 
                    lock = false
                } else if(sp.isTeacher && sp.username == sp.teacher) {  
                    if(!lock) {
                        dp.createRoom()
                        lock = true
                    }
                }
                break
            }
            default: break
        }
        return Object.assign(sp, dp, op)
    }

    return rootWrapper(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        props => { 
            props.authWS(props.id, props.username, props.isTeacher)
            props.subscribe() 
        },
        View
    )
}