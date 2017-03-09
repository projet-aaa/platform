import * as React from "react"
import { Link } from "react-router"
import * as chartjs from "react-chartjs-2"

export interface StateProps {
    timeline: string
    params
}

export interface ActionProps {
    
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            timeline,
            params
        } = this.props

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 style={ { marginTop: 0 } }>Statistique de la session { params.course }</h2>
                        <Link to={ "/" + params.UE + "/" + params.course + "/statistique/prof/quiz" }>
                            Regarder les résultats des quizs</Link><br/>
                        <Link to={ "/" + params.UE + "/" + params.course + "/statistique/prof/attention" }>
                            Regarder les retours des élèves</Link><br/>
                        <div dangerouslySetInnerHTML={ { __html: timeline } }/>
                    </div>
                </div>
            </div>
        )
    }
}