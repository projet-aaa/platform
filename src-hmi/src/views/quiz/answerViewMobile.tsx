// represents an answer choice of an faq Question

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    // the answer index
    ind: number
    // The answer 
    text: string
    // True if it has been chosen by the user
    chosen: boolean
}

export interface ActionProps {
    // select an answer
    choose()
}

// styles
var sizeText = {
    fontSize: 10
}
var bottomPadding = {
    paddingBottom: 2
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            ind,
            chosen,
            choose,
            text
        } = this.props;

        let colorAnswerButton
        if (chosen) {
            colorAnswerButton = { backgroundColor: "green" }
        } else {
            colorAnswerButton = { }
        }
    
        // An answer is a button
        return (
            <li className="without-bullet" style={ bottomPadding }>
                <button className="btn btn-sm btn-primary covering-size" onClick={ choose } style={ colorAnswerButton }>{ text }</button>
            </li>
        )
    }
}