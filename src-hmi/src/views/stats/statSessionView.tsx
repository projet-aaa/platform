import * as React from "react"
import { Link } from "react-router"

import { Session } from '../../models/session'

import { View as SessionItemsView } from '../sessions/sessionItemsView'

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

        return (
            <div className="col-lg-12">
                <h2>Session en cours: </h2>
                <SessionItemsView sessions={ sessions } choose={ choose }/>
            </div>
        );
    }
}