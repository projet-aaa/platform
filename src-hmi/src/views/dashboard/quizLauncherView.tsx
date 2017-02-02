import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { QuizStats, Choices } from "../../models/dashboard"

export interface StateProps {
    quizStats: QuizStats
    title: string
}

export interface ActionProps { 
    launch()
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizStats, title,
            launch
        } = this.props;

        let res = null
        if(quizStats.state == 0) {
            res = title + ": " 
                + quizStats.choices[quizStats.correctAnswer - 1].percentChosen + "%";
        } else if(quizStats.state == 1) {
            res = title + ": lancé";
        } else {
            res = <button className="btn btn-lg btn-primary" onClick={launch}> { title } </button>
        }


        return (
            <li><h3> {res} </h3></li>
        );
    }
}