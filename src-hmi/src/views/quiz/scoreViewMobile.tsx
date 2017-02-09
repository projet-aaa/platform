// represents the score of a user on the last quiz

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   score: number
}

export interface ActionProps {}

// style for the text
var sizeText = {
    fontSize: 15
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            score
        } = this.props;

        // we show a panel containing all the values defined above
        return (
            <div className="text-center">
                <h3 style={sizeText}>Score global : {score}</h3>
            </div>
        );
    }
}