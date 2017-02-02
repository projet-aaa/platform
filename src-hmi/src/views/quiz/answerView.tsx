// represents an answer choice of an faq Question

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   text: string // the answer
   chosen: boolean // true if it's the chosen answer
}

export interface ActionProps {
    choose() // select an answer
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            chosen, choose, text
        } = this.props;

        var mediumSizeText = {
            fontSize: 30
        }
        // an answer is a radio button with text
        return (
            <li className="without-bullet">
                <input type="radio" checked={chosen} onClick={ choose }/>
                <label className="tab" style={mediumSizeText}>{text}</label>
            </li>
        );
    }
}