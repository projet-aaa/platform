import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    date: Date
    commenter: string
    comment: string
}

export interface ActionProps { }

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            date,
            commenter,
            comment
        } = this.props

        return (
            <li className="list-group-item">
                { '[' + date + ']' + commenter }: { comment }
            </li>
        )
    }
}