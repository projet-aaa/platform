import * as React from "react"
import { Link } from "react-router"
import * as chartjs from "react-chartjs-2"

export interface StateProps {
    timeline: string
}

export interface ActionProps {
    
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            timeline
        } = this.props

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12" dangerouslySetInnerHTML={ { __html: timeline } }>
                    </div>
                </div>
            </div>
        )
    }
}