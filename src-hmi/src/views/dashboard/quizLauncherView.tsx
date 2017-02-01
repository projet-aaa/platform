import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { QuizStats, Choices } from "../../models/dashboard"

export interface StateProps {
    quizStats: QuizStats
    id: number
}

export interface ActionProps { 
    launch()
}



export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizStats,id,
            launch
        } = this.props;

        let res = null
        if (quizStats.state==0) {
            res = "Quiz " + id + " : " 
                + quizStats.choices[quizStats.correctAnswer-1].percentChosen + "%";
        } else if (quizStats.state==1){
            res = "Quiz launched";
        } else {
            res = <button onClick={launch}> {"Quiz " + id} </button>
        }


        return (
            <li> {res} </li>
        );
    }
}