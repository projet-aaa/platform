import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"


export interface StateProps {
    // percent of panicking people
    panicRate: number
    // percent of people who think lesson goes too slow
    slowRate: number
    // percent of people who think lesson goes too fast
    quickRate: number
}

export interface ActionProps { }

// padding style
var palNew = {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            panicRate,
            slowRate,
            quickRate        
        } = this.props;

        // widths of the progress bars
        var panicStyle = {
            width: panicRate + "%",
            backgroundColor: "#d9534f" // danger color
        }
        var slowStyle = {
            width: slowRate + "%",
            backgroundColor: "#5cb85c" // success color
        }
        var fastStyle = {
            width: quickRate + "%",
            backgroundColor: "#f0ad4e" // warning color
        }

        return (
                <div className="panel">
                    <div className="panel-heading">
                        Retours des élèves
                    </div>
                    <div className="panel-body">
                        <div style={ palNew }>
                            <div className="row">
                                Incompréhension
                                <div className="progress progress-sm mbn">
                                    <div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                                        style={ panicStyle } className="progress-bar covering-size"/>
                                </div>
                            </div>
                            <div className="row">
                                Trop lent
                                <div className="progress progress-sm mbn">
                                    <div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                                        style={ slowStyle } className="progress-bar covering-size"/>
                                </div>
                            </div>
                            <div className="row">
                                Trop rapide
                                <div className="progress progress-sm mbn">
                                    <div role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
                                        style={ fastStyle } className="progress-bar covering-size"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
