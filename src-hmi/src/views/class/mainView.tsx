import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps { 
    params: any
    isTeacher: boolean
}

export interface ActionProps { }

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            params,
            isTeacher
        } = this.props;

        let preURL = "/" + params.UE + "/" + params.course + "/"
        return (
            <div className="col-lg-12"> 
                <div className="row">
                    <div className="col-lg-12">
                        <h2 style={ { marginTop: 0 } }>Session { params.course }</h2>
                        { !isTeacher && <div><Link to={ preURL + "questionnaires" }>
                            Questionnaires de la section</Link><br/></div> }
                        { isTeacher && <div><Link to={ preURL + "statistique" }>
                            Statistiques de la section</Link><br/></div> }
                        <Link to={ preURL + "direct" }>
                            Salles en directes courantes</Link> <br/>
                        <Link to={ preURL + "faq" }>
                            FAQ</Link> <br/>
                    </div>
                </div>
            </div>
        );
    }
}