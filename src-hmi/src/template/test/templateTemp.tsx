import * as React from "react"
import { Link } from "react-router"

export interface StateProps { }

export interface ActionProps { }

export interface IntrinsicProps {
    children: any
}

export type Props = StateProps & ActionProps & IntrinsicProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const { children } = this.props

        return (
            <div>
                Ceci est un template, il contient : <br/>
                { children }
            </div>
        );
    }
}