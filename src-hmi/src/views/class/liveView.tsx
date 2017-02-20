import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { RoomInfo } from "../../models/wsServer/server"

export interface StateProps { 
    rooms: RoomInfo[]
}

export interface ActionProps { }

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            rooms
        } = this.props;

        return (
            <div>
                <h2>Salles ouvertes</h2>
                { rooms &&
                    <ul>
                    {rooms.map(room => {
                        <li className="list-group-item"> 
                            { room.teacher }
                        </li>
                    })}
                    </ul>
                }
            </div>
        );
    }
}