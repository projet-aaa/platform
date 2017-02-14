import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"

import { calculateQuizData } from "../../utils"

import { Quiz } from "../../models/class/class"

export interface StateProps {
    quiz: Quiz[]
    quizChoices: any[]

    currentQuizId: number
}

export interface ActionProps { 
    chooseQuiz(quizId: number)
    gotoFeedback()
    gotoSession()
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            quizChoices,

            currentQuizId,

            chooseQuiz,
            gotoFeedback,
            gotoSession
        } = this.props

        let data = calculateQuizData(quizChoices[currentQuizId]),
            currentQuiz = quiz[currentQuizId]

        return (
            <div className="page-content">
                <div className="row">
                    <div className="col-lg-12">
                        <button type="button" className="btn btn-primary" onClick={ gotoFeedback }>
                            Voir les retours des élèves
                        </button>
                        <button type="button" className="btn btn-primary" onClick={ gotoSession }>
                            Retourner aux sessions
                        </button>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="panel">
                        <div className="panel-heading">
                            { currentQuiz.title }
                        </div>
                        <div className="panel-body pan white-background"> 
                            { currentQuiz.question }
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
                                { quiz.map((q) => {
                                    return <a 
                                        key={q.id} 
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