// QUIZ LAUNCHER VIEW
// Renders a quiz name which can be clicked in order to launch it

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { QuizStats, Choices } from "../../models/dashboard"

export interface StateProps {
    // the quiz statistics (in case the quiz has been completed)
    quizStats: QuizStats
    // the title of the quiz
    title: string
}

export interface ActionProps {
    // Fires an action signaling that a quiz has been launched
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
        // render is different if the quiz is not launched, is launched or is completed
        let res = null
        if(quizStats.state == 0) {
            res = title + ": " 
                + quizStats.choices[quizStats.correctAnswer - 1].percentChosen + "%";
        } else if(quizStats.state == 1) {
            res = title + ": lancé";
        } else {
            res = <button className="btn btn-lg btn-primary" onClick={launch}> { title } </button>
        }

        // show the name of the quiz with a button to launch it, a text indicated it has been launched or his stat
        return (
            <li><h3> {res} </h3></li>
        );
    }
}