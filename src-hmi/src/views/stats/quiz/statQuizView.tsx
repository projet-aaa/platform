import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"

import { calculateQuizData } from "../../../utils"

import { Quiz } from "../../../models/class/class"

export interface StateProps {
    quiz: Quiz[]
    quizChoices: any[]

    currentQuizId: number
}

export interface ActionProps { }

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            quizChoices,
            
            currentQuizId
        } = this.props

        let data = calculateQuizData(quizChoices[currentQuizId]),
            currentQuiz = quiz[currentQuizId]

        return (
            <div className="panel col-lg-7">
                <div className="panel-heading">
                    { currentQuiz.title }
                </div>
                <div className="panel-body pan white-background"> 
                    { currentQuiz.question }
                    <chartjs.Line data={ data }/>  
                </div>
            </div>
        )
    }
}