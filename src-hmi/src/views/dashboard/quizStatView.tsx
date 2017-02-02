import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import * as chartjs from "react-chartjs-2"

import { QuizStats, Choices } from "../../models/dashboard"

export interface StateProps {
    quizStats: QuizStats
}

export interface ActionProps { }

const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#ffff00",
    "#ff0000",
    "#00e64d",
    "#FF6384",// repeat (lazy)
    "#36A2EB",
    "#ffff00",
    "#ff0000",
    "#00e64d"
]

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    filledDataset(quizStats: QuizStats) {
        let data = {
            labels: quizStats.choices.map(i => {
                return i.text
            }),
            datasets: [
                {
                    data: quizStats.choices.map(i => {
                        return i.percentChosen
                    }),
                    backgroundColor: chartColors.slice(0, quizStats.choices.length),
                    hoverBackgroundColor: chartColors.slice(0, quizStats.choices.length)
                }
            ]
        }
        return data;
    }

    render() {
        const {
            quizStats      
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

        //Build list of answer's information
        let ret = "";
        for(let i = 0; i < quizStats.choices.length; i++) {
            ret = ret + quizStats.choices[i].text + " : "  + quizStats.choices[i].percentChosen.toString() + " %  || ";
        }
        ret = ret + " Réponse correcte : " + quizStats.correctAnswer;

        let data = this.filledDataset(quizStats)

        console.log(data)
        return (
            <div className="panel">
                <div className="panel-heading">
                    Statistiques du dernier Quiz
                </div>
                <div className="panel-body pan white-background"> 
                    <div className="pal">
                        <chartjs.Pie data={ data } height={ 105 }/>                    
                        { ret }
                    </div>
                </div>
            </div>
        );
    }
}

 //options={ options } width="150" height="150" />  