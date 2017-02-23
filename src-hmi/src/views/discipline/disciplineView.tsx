// Represents a discipline home page

// EXTENRAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { Session, SessionType } from "../../models/session"
import { ddmmyyyy } from "../../utils/index"

export interface StateProps {
    // the list of sessions, it must be sorted by date
    sessions: Session[]
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            sessions
        } = this.props;

        var CMRender = []
        var TDRender = []
        var TPRender = []
        for (var i in sessions) {
            if (sessions[i].sessionType == SessionType.CM) {
                CMRender.push(
                    <Link to={ sessions[i].discipline + "/" + sessions[i].sessionName } key={i} className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                    </Link>
                )
            }
            if (sessions[i].sessionType == SessionType.TD) {
                TDRender.push(
                    <Link to={ sessions[i].discipline + "/" + sessions[i].sessionName } key={i} className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                    </Link>
                )
            }
            if (sessions[i].sessionType == SessionType.TP) {
                TPRender.push(
                    <Link to={ sessions[i].discipline + "/" + sessions[i].sessionName } key={i} className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                    </Link>
                )
            }
        }

        // a list of sessions sorted by type and then by date
        return (
            <div>
                <div>
                    <h2 className="tab">CMs</h2>
                    <div className="row">
                        { CMRender }
                    </div>
                </div>
                <div>
                    <h2 className="tab">TDs</h2>
                    <div className="row">
                        { TDRender }
                    </div>
                </div>
                <div>
                    <h2 className="tab">TPs</h2>
                    <div className="row">
                        { TPRender }
                    </div>
                </div>
            </div>
        );
    }
}