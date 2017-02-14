// Represents the content of the home page

// EXTENRAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { Session, SessionType } from "../../models/session"
import { ddmmyyyy } from "../../utils/index"

export interface StateProps {
    // the list of sessions of all disciplines, it must be sorted by reverse date
    sessions: Session[],
    // the list of disciplines
    disciplines: string[]
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            sessions,
            disciplines
        } = this.props;

        console.log("main view: ", sessions)

        var sessionsRender = []
        for (var i=0 ; i<sessions.length ; i++) {
            sessionsRender.push(
                <a href="#" className="list-group-item">
                    { ddmmyyyy(sessions[i].date) } | { sessions[i].discipline } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                </a>
            )
        }
        var filtersRender = []
        for (var i=0; i < disciplines.length; i++) {
            filtersRender.push(
                <li className="without-bullet">
                    <label className="checkbox-inline">
                        <input id="optionsVisa" type="checkbox" name="optionsRadios" value="Visa" />
                        &nbsp; { disciplines[i] }
                    </label>
                </li>
            )
        }

        // a list of sessions sorted by date
        return (
            <div>
                <div className="col-lg-8">
                    <div className="row">
                        <form action="" method="POST" className="box box-solid">
                            <div className="input-group">
                                <input type="text" placeholder="Rechercher" name="search" className="form-control input-lg"/>

                                <div className="input-group-btn">
                                    <button className="btn btn-lg btn-primary" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        { sessionsRender }
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="panel panel-grey">
                        <div className="panel-heading">
                            Filtres
                        </div>
                        <div className="panel-body pan">
                            <ul>
                                { filtersRender }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}