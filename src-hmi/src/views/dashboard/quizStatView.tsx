// QUIZ STAT VIEW
// Renders a diagram with quiz statistics

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"

import { calculateQuizData } from "../../utils"

import { chartColors } from "../../models/consts"

export interface StateProps {
    showQuiz: boolean
    question: string
    state: string
    quizStats: any // map from choice to count
    correctChoice: string
}

export interface ActionProps { 
    quizButton()
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props
    
    render() {
        const {
            showQuiz,
            question,
            state,
            quizStats,
            correctChoice,

            quizButton 
        } = this.props

        let data = calculateQuizData(quizStats)

        return (
            <div className="panel">
                <div className="panel-heading">
                    Quiz{ showQuiz && ": " + question +" [" + state + "]" }
                </div>
                <div className="panel-body pan white-background"> 
                    { showQuiz ? 
                        <div className="pal">
                            { Object.keys(quizStats).length === 0 && quizStats.constructor === Object 
                                ? <h1>En attente de réponse...</h1>
                                : <chartjs.Pie data={ data } height={ 105 }/> }                   
                            { "Réponse correcte : " + correctChoice }
                            <button className="btn btn-primary pull-right" onClick={ quizButton }>
                                { state == "correction" ? "terminer" : "correction" }
                            </button>
                        </div> :
                        <div className="pal">
                            <h1>Aucune quiz lancé</h1>
                        </div>
                    }
                </div>
            </div>
        );
    }
}