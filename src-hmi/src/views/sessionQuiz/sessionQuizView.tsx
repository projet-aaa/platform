import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import DashboardContainer from "../../containers/dashboard/dashboardContainer"
import PresentationContainer from "../../containers/dashboard/presentationContainer"
import RemoteContainer from "../../containers/quiz/remoteContainer"

export interface StateProps { 
    rooms: { id: number, teacher: string}[]
    isTeacher: boolean
    roomOwner: string
}

export interface ActionProps { 
    updateRooms()
    joinRoom(roomId: number)
    leaveRoom()
    closeRoom()
    openRoom()
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            rooms,
            isTeacher,
            roomOwner,

            updateRooms,
            joinRoom,
            leaveRoom,
            closeRoom,
            openRoom
        } = this.props

        let dashboard: boolean = (this.props as any).location.pathname == "/dashboard",
            presentation: boolean = (this.props as any).location.pathname == "/presentation",
            remote: boolean = (this.props as any).location.pathname == "/remote"

        return (
            <div>
                <div>
                    <button onClick={ updateRooms }>Update rooms</button>
                    <button onClick={ leaveRoom }>Leave room</button>
                    { roomOwner != null && <button onClick={ closeRoom }>Close room</button> }
                    { isTeacher && <button onClick={ openRoom }>Open room</button> }
                    Current room: { roomOwner != null ? roomOwner : "none" }
                    <br/>
                    { rooms.map(room => {
                        return <button key={ room.id } onClick={ () => joinRoom(room.id) }>
                            Join Room { room.teacher }
                        </button>
                    })}
                </div>
                { remote && <RemoteContainer/>}
                { dashboard && <DashboardContainer/>}
                { presentation && <PresentationContainer/>}
            </div>
        )
    }
}