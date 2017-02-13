// QUIZ STAT VIEW
// Renders a diagram with quiz statistics

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"

import { chartColors } from "../../models/consts"

export interface StateProps {
    quizStats: any // map from choice to count
    correctChoice: string
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    filledDataset(quizStats: any) {
        let choices = [],
            percentages = []

        for(var k in quizStats) {
            choices.push(k)
            percentages.push(quizStats[k])
        }

        console.log("choices: ", choices)
        console.log("percentages: ", percentages)

        let len = choices.length

        let data = {
            labels: choices,
            datasets: [
                {
                    data: percentages,
                    backgroundColor: chartColors.slice(0, len),
                    hoverBackgroundColor: chartColors.slice(0, len)
                }
            ]
        }
        return data;
    }

    render() {
        const {
            quizStats,
            correctChoice   
        } = this.props;

        let options = {
            cutoutPercentage: 0,
            rotation: -0.5 * Math.PI,
            circumference: 2 * Math.PI,
            animation: {
                animateRotate: false,
                animateScale: false,
            },
            legend: {
                labels: {
                    generateLabels: function(chart) {}
                },
                onClick: function(event, legendItem) {} 
            }
        }

        let data = this.filledDataset(quizStats)

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