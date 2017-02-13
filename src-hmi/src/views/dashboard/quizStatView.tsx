// QUIZ STAT VIEW
// Renders a diagram with quiz statistics

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"

import { calculateQuizData } from "../../utils"

export interface StateProps {
    quizStats: any // map from choice to count
    correctChoice: string
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizStats,
            correctChoice   
        } = this.props;

        let data = calculateQuizData(quizStats)

        return (
            <div className="panel">
                <div className="panel-heading">
                    Statistiques du dernier Quiz
                </div>
                <div className="panel-body pan white-background"> 
                    <div className="pal">
                        <chartjs.Pie data={ data } height={ 105 }/>                    
                        { "Réponse correcte : " + correctChoice }
                    </div>
                </div>
            </div>
        );
    }
}