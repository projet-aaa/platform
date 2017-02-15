import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import DashboardContainer from "../../containers/dashboard/dashboardContainer"
import PresentationContainer from "../../containers/dashboard/presentationContainer"
import RemoteContainer from "../../containers/quiz/remoteContainerDesktop"

export interface StateProps { 
    rooms: number[]
    isTeacher: boolean
    room: number
}

export interface ActionProps { 
    updateRooms()
    joinRoom(roomId: number)
    leaveRoom()
    openRoom()
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            rooms,
            isTeacher,
            room,

            updateRooms,
            joinRoom,
            leaveRoom,
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
                    { isTeacher && <button onClick={ openRoom }>Open room</button> }
                    Current room: { room != -1 ? room : "none" }
                    <br/>
                    { rooms.map(room => {
                        return <button key={room} onClick={ () => joinRoom(room)}>Join Room { room }</button>
                    })}
                </div>
                { remote && <RemoteContainer/>}
                { dashboard && <DashboardContainer/>}
                { presentation && <PresentationContainer/>}
            </div>
        )
    }
}