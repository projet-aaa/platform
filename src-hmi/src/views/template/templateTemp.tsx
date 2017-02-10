import * as React from "react"
import { Link } from "react-router"

export interface StateProps {
    view: any
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            view
        } = this.props

        return (
            <div>
                Ceci est un template, il contient : <br/>
                { view }
            </div>
        );
    }
}