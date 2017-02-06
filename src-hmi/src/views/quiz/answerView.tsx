// ANSWER VIEW
// Renders a choice for an MCQ

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   // The answer 
   text: string
   // True if it has been chosen by the user
   chosen: boolean
}

export interface ActionProps {
    // Fires an action signaling that this answer has been chosen
    choose()
}

// Style for the text
var mediumSizeText = {
    fontSize: 30
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            chosen, choose, text
        } = this.props;

        // An answer is a radio button with text
        return (
            <li className="without-bullet" onClick={ choose }>
                <input type="radio" checked={ chosen }/>
                <label className="tab" style={ mediumSizeText }>{ text }</label>
            </li>
        );
    }
}