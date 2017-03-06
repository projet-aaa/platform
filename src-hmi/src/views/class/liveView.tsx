import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { RoomInfo } from "../../models/wsServer/server"

export interface StateProps { 
    rooms: RoomInfo[]
    isTeacher: boolean
    username: string
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
            isTeacher,
            username,

            genURL            
        } = this.props

        return (
            <div className="col-lg-12"> 
                <div className="row">
                    <div className="col-lg-12">
                        <h2 style={ { marginTop: 0 } }>Salles ouvertes</h2>
                        { rooms &&
                            <ul className="list-group">
                            {rooms.map(room => {
                                return <Link to={ genURL(room.teacher) } className="list-group-item"> 
                                    { genURL(room.teacher) } : { room.teacher }
                                </Link>
                            })}
                            </ul>
                        }
                        { isTeacher && 
                            <Link to={ genURL(username) }>Créer ou rejoindre la salle à mon nom</Link> 
                        }
                    </div>
                </div>
            </div>
        )
    }
}