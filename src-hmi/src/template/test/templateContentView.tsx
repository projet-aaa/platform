import * as React from "react"
import { Link } from "react-router"

export interface StateProps { }
export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const { } = this.props

        return (
            <div>
                Ceci est du contenu
            </div>
        );
    }
}