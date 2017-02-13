import * as React from "react"
import { Link } from "react-router"

import { View as SessionItemView } from './sessionItemView'

import { Session } from '../../models/session'

export interface StateProps {
    sessions: Session[]
}

export interface ActionProps {
    choose(profId: string)
 }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            sessions,
            choose
        } = this.props

        let sessionItems = sessions.map((session) => {
            return <SessionItemView session={ session } choose={ () => choose(session.profId) }/>
        })
        return (
            <div className="list-group">
                { sessionItems }
            </div>
        );
    }
}