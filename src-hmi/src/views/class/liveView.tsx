import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { RoomInfo } from "../../models/wsServer/server"

export interface StateProps { 
    rooms: RoomInfo[]
}

export interface ActionProps { 
    gotoLive()
    genURL(teacher: string)
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            rooms,

            genURL            
        } = this.props

        return (
            <div>
                <h2>Salles ouvertes</h2>
                { rooms &&
                    <ul className="list-group">
                    {rooms.map(room => {
                        return <Link to={ genURL(room.teacher) } className="list-group-item"> 
                            { genURL(room.teacher) } : { room.teacher }
                        </Link>
                    })}
                    </ul>
                }
            </div>
        );
    }
}