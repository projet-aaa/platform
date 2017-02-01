import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"


import { QuizStats, Choices } from "../../models/dashboard"

export interface StateProps {
    quizStats: QuizStats
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizStats      
        } = this.props;

        //Build list of answer's information
        var ret = "";
        for (var i=0; i<quizStats.choices.length; i++)
        {
            ret = ret + quizStats.choices[i].text + " : "  + quizStats.choices[i].percentChosen.toString() + " %  || ";
        }

        ret = ret + " Réponse correcte : " + quizStats.correctAnswer;

        return (
            <div> 
                {ret}
            </div>
        );
    }
}