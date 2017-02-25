// FEEDBACK VIEW
// Renders the components allowing a student to signal his state of attention

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { AttentionStateType } from "../../models/class/class"

export interface StateProps {}

export interface ActionProps {
    state: string
    // Fires an action signaling that the user is panicking
    signalPanic()
    // Fires an action signaling that the lesson goes too slow
    signalSlow()
    // Fires an action signaling that the lesson goes too fast
    signalFast()
    // Fires and action signaling that the user is ok
    signalOk()
}

var buttonMargin = {
    margin : 20
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            state, signalPanic, signalSlow, signalFast, signalOk
        } = this.props;
        // each action is associated to a button, these 3 buttons form a triangle
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className={ state == AttentionStateType.PANIC 
                                            ? "btn btn-lg btn-danger active" 
                                            : "btn btn-lg btn-danger" }
                            style={buttonMargin} onClick={ signalPanic }>
                        Panique
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className={ state == AttentionStateType.TOO_FAST 
                                            ? "btn btn-lg btn-warning active" 
                                            : "btn btn-lg btn-warning" } 
                            style={buttonMargin} onClick={ signalFast }>
                        Trop Rapide
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className={ state == AttentionStateType.TOO_SLOW 
                                            ? "btn btn-lg btn-success active" 
                                            : "btn btn-lg btn-success" } 
                            style={buttonMargin} onClick={ signalSlow }>
                        Trop Lent
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className={ state == AttentionStateType.OK 
                                            ? "btn btn-lg btn-primary active" 
                                            : "btn btn-lg btn-primary" } 
                            style={buttonMargin} onClick={ signalOk }>
                        Tout va bien
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}