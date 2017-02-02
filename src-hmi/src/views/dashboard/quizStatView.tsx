import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import * as chartjs from "react-chartjs"

import { QuizStats, Choices } from "../../models/dashboard"

export interface StateProps {
    quizStats: QuizStats
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    filledDataset(quizStats: QuizStats) {
        var data = {
            labels: quizStats.choices.map(i => {
                return i.text
            }),
            datasets: [
                {
                    data: quizStats.choices.map(i => {
                        return i.percentChosen
                    }),
                }
            ]
        }
        return data;
    }

    render() {
        const {
            quizStats      
        } = this.props;

        var options = {
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

        //Build list of answer's information
        var ret = "";
        for (var i=0; i<quizStats.choices.length; i++)
        {
            ret = ret + quizStats.choices[i].text + " : "  + quizStats.choices[i].percentChosen.toString() + " %  || ";
        }

        ret = ret + " Réponse correcte : " + quizStats.correctAnswer;

        console.log(chartjs.PieChart);
        console.log(chartjs)

        return (
            <div className="panel">
                <div className="panel-heading">
                    Statistiques du dernier Quiz
                </div>
                <div className="panel-body pan white-background"> 
                    <div className="pal">
                        <chartjs.Pie data={this.filledDataset(quizStats)} options={options} width="150" height="150" />                        
                        {ret}
                    </div>
                </div>
            </div>
        );
    }
}

