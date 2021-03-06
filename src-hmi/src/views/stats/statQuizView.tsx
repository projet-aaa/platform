import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"
import * as _ from "underscore"

import { calculateQuizData } from "../../utils"

import { Quiz } from "../../models/class/class"

export interface StateProps {
    params: any
    quiz: any // id -> Quiz
    quizChoices: any // id -> choices

    currentQuizId: number
}

export interface ActionProps { 
    chooseQuiz(quizId: string)
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            params,
            quiz,
            quizChoices,

            currentQuizId,

            chooseQuiz
        } = this.props

        let data = calculateQuizData(quizChoices[currentQuizId]),
            currentQuiz = quiz[currentQuizId]

        return (
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 style={ { marginTop: 0 } }>Résultats aux quiz live</h2>
                        <Link to={ "/" + params.UE + "/" + params.course + "/statistique/prof/attention" }>
                            Regarder les retours des élèves
                        </Link><br/>
                        <Link to={ "/" + params.UE + "/" + params.course + "/statistique/prof/timeline" }>
                            Regarder la timeline</Link><br/>
                        <Link to={ "/" + params.UE + "/" + params.course + "/statistique/" }>
                            Retour
                        </Link>
                    </div>
                </div>

                <br/>

                <div className="col-lg-7">
                    <div className="panel">
                        <div className="panel-heading">
                            { currentQuiz.title }
                        </div>
                        <div className="panel-body pan white-background"> 
                            <chartjs.Pie data={ data }/>  
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="panel">
                        <div className="panel-heading">
                            Quiz
                        </div>
                        <div className="panel-body pan white-background"> 
                            <div className="page-content">
                                { _.values(quiz).map(q => {
                                    return <a 
                                        key={ q.id } 
                                        className="list-group-item" 
                                        onClick={ () => chooseQuiz(q.id) }>
                                        { q.title }
                                    </a>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}