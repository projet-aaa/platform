// QUIZ LAUNCHER VIEW
// Renders a quiz name which can be clicked in order to launch it

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    quizId: string
    title: string
    state: number // 0: not done; 1: being run; 2: already ran 
    successRate: number
}

export interface ActionProps {
    // Fires an action signaling that a quiz has been launched
    launch()
}

// style
var topMargin = {
    marginTop: 0
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizId,
            title,
            state,
            successRate,
            launch
        } = this.props
        
        // render is different if the quiz is not launched, is launched or is completed
        let res = null
        if(state == 2) { // the quiz is done
            res = title + ": " + successRate + "%";
        } else if(state == 1) { // the quiz is launched, in heading mode
            res = <a className="link-text" onClick={ launch }>{ title }: correction</a>
        } else if(state == 0) { // the quiz is not launched, ready to be launched
            res = <a className="link-text" onClick={ launch }>{ title }</a>
        } else { // the quiz is in correction mode
            res = <a className="link-text" onClick={ launch }>{ title }: terminer</a>
        }

        return (
            <li className="without-bullet">
                <h3 style={ topMargin }>
                    { res }
                </h3>
            </li>
        );
    }
}