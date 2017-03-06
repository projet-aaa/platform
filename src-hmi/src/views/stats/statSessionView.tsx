import * as React from "react"
import { Link } from "react-router"

import { Session } from '../../models/session'

import { View as SessionItemsView } from '../sessions/sessionItemsView'

export interface StateProps {
    params: any
}

export interface ActionProps {

}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
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
                            Regarder les retours des élèves</Link>
                    </div>
                </div>
            </div>
        );
    }
}

                // <h2>Séance du cours: </h2>
                // <SessionItemsView sessions={ sessions } choose={ choose }/>