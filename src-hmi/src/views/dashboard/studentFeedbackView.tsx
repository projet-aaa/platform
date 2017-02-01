import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"


export interface StateProps {
    panicAlert: boolean
    slowerAlert: boolean
    quickerAlert: boolean
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            panicAlert, slowerAlert, quickerAlert        
        } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="col-lg-4">
                        Panique : { panicAlert ? "ON" : "OFF"}
                    </div>
                    <div className="col-lg-4">
                        Plus lent : { slowerAlert ? "ON" : "OFF"}
                    </div>
                    <div className="col-lg-4">
                        Plus rapide : { quickerAlert ? "ON" : "OFF"}
                    </div>
                </div>
            </div>
        );
    }
}
