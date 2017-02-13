// Represents a discipline home page

// EXTENRAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { Session, SessionType } from "../../models/class/class"
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

        var CMRender = [<h2 className="tab">CMs</h2>]
        var TDRender = [<h2 className="tab">TDs</h2>]
        var TPRender = [<h2 className="tab">TPs</h2>]
        for (var i=0 ; i<sessions.length ; i++) {
            if (sessions[i].sessionType == SessionType.CM) {
                CMRender.push(
                    <a href="#" className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                    </a>
                )
            }
            if (sessions[i].sessionType == SessionType.TD) {
                TDRender.push(
                    <a href="#" className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                    </a>
                )
            }
            if (sessions[i].sessionType == SessionType.TP) {
                TPRender.push(
                    <a href="#" className="list-group-item">
                        { ddmmyyyy(sessions[i].date) } | { sessions[i].sessionName } : { sessions[i].teacherName } { sessions[i].live ? ": live!" : "" }
                    </a>
                )
            }
        }

        // a list of sessions sorted by type and then by date
        return (
            <div>
                <div>
                    { CMRender }
                </div>
                <div>
                    { TDRender }
                </div>
                <div>
                    { TPRender }
                </div>
            </div>
        );
    }
}