import * as React from "react"
import { Link } from "react-router"

import { Session } from '../../models/session'

export interface StateProps {
    session: Session
}

export interface ActionProps {
    choose()
 }


export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            session,
            choose
        } = this.props

        return (
            <a href="#" className="list-group-item">
                { session.sessionName }
            </a>
        );
    }
}