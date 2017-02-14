import * as React from "react"
import { Link } from "react-router"
import * as chartjs from "react-chartjs-2"

import { ClassEvent } from '../../models/class/class'

import { calculateQuizData } from '../../utils'

export interface StateProps {
    panic: number[]
    tooSlow: number[]
    tooFast: number[]
    date: number[]

    comments: {
        comment: string
        commenter: string
        date: Date    
    }[]
}

export interface ActionProps {
    goToQuiz()
    goToSessions()
}

const panicColor = "#FF6384"
const tooFastColor = "#36A2EB"
const tooSlowColor = "#ffff00"

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    calculateData(panic: number[], tooSlow: number[], tooFast: number[], date: number[]): any {
        return {
            labels: date,
            datasets: [
                {
                    label: "Panique",
                    data: panic,
                    pointBorderColor: panicColor,
                    borderColor: panicColor,
                    fill: false,
                    lineTension: 0.1
                },
                {
                    label: "Trop lent",
                    data: tooSlow,
                    pointBorderColor: tooSlowColor,
                    borderColor: tooSlowColor,
                    fill: false,
                    lineTension: 0.1
                },
                {
                    label: "Trop rapide",
                    data: tooFast,
                    pointBorderColor: tooFastColor,
                    borderColor: tooFastColor,
                    fill: false,
                    lineTension: 0.1
                }
            ]
        }
    }

    render() {
        const {
            panic,
            tooSlow,
            tooFast,
            date,
            comments,

            goToQuiz,
            goToSessions
        } = this.props

        let data = this.calculateData(panic, tooSlow, tooFast, date)

        return (
            <div className="page-content">
                <div className="row">
                    <div className="col-lg-12">
                        <button type="button" className="btn btn-primary" onClick={ goToQuiz }>
                            Voir les résultats du quiz
                        </button>
                        <button type="button" className="btn btn-primary" onClick={ goToSessions }>
                            Retourner aux sessions
                        </button>
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-heading">
                        L'attention durant le cours:
                    </div>
                    <div className="panel-body pan white-background"> 
                        <chartjs.Line data={ data }/>  
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-heading">
                    Commentaires:
                    </div>
                    <div className="panel-body pan white-background"> 
                        { comments.map((comment) => {
                        return <li className="list-group-item">
                            { '[' + comment.date + ']' + comment.commenter }: { comment.comment }
                        </li>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}