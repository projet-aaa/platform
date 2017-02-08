// represents the buttons that a student have to give feedback to the teacher

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {}

export interface ActionProps { 
    signalPanic() // select the "panic"" button
    signalSlow() // select the "too slow" button
    signalFast() // select the "too fast" button
}

var buttonMargin = {
    margin : 10
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            signalPanic, signalSlow, signalFast
        } = this.props;
        // these 3 buttons form a triangle
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="btn btn-lg btn-danger" style={buttonMargin} onClick={ signalPanic }>
                        Panique
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="btn btn-lg btn-warning" style={buttonMargin} onClick={ signalFast }>
                        Trop Rapide
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="btn btn-lg btn-success" style={buttonMargin} onClick={ signalSlow }>
                        Trop Lent
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}