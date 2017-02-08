// represents what sees a student during a live session (his remote)

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import {View as QuizView} from "../../views/quiz/quizView"
import {View as QuizViewMobile} from "../../views/quiz/quizViewMobile"
import {View as ScoreView} from "../../views/quiz/scoreView"
import {View as ScoreViewMobile} from "../../views/quiz/scoreViewMobile"
import {View as FeedbackView} from "../../views/quiz/feedbackView"
import { View as CommentBoxView} from "./commentBoxView"
import { View as CommentBoxViewMobile} from "./commentBoxViewMobile"
import { QuizType, Quiz } from "../../models/class/class"
import { getText } from '../../utils'

export interface StateProps {
    // a quiz
    quiz: Quiz
    // true if consultation mode, false if answer mode
    answerConsultation: boolean
    // true if display mode, false else
    displayMode: boolean
    score: number
    rank: number
    population: number
    highScore: number
    average: number
}
export interface ActionProps {
    // Fires an action signaling that an answer has been chosen
    choose(id: number, choice: any)
    // Fires an action signaling that an answer has been validated
    validateAnswer(quizId: number)
    // Fires an action signaling a comment has been sent
    sendComment(comment: string)
    // go to the next question
    nextQuiz()
    // go to the previous question
    prevQuiz()
    // signal panic
    signalPanic()
    // signal slow
    signalSlow()
    // signal fast
    signalFast()
}

// style
var palNew = {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    color: "#000000"
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            answerConsultation,
            displayMode,
            validateAnswer,
            score,
            rank,
            population,
            highScore,
            average,
            choose,
            sendComment,
            nextQuiz,
            prevQuiz,
            signalPanic,
            signalSlow,
            signalFast
        } = this.props;
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let question = true
        let left = question ?
                    <QuizView quiz={ quiz } choose={ choose } validate={ validateAnswer } answerConsultation={ answerConsultation } displayMode={ displayMode } nextQuiz={ nextQuiz } prevQuiz={ prevQuiz }/> :
                    <FeedbackView signalPanic={ signalPanic } signalSlow={ signalSlow } signalFast={ signalFast }/>
        let leftMobile = question ?
                    <QuizViewMobile quiz={ quiz } choose={ choose } validate={ validateAnswer }/> :
                    <FeedbackView signalPanic={ signalPanic } signalSlow={ signalSlow } signalFast={ signalFast }/>
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
                <MediaQuery query='(min-width: 1224px)'>
                    <div className="page-content" >
                        <div className="row">
                            <div className="col-lg-8">
                                { left }
                            </div>
                            <div className="col-lg-4">
                                <div className="row">
                                    <ScoreView score={ score } rank={ rank } population={ population } highScore={ highScore } average={ average }/>
                                </div>
                                <div className="row">
                                    <CommentBoxView send={ sendComment }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query='(max-width: 1224px)'>
                    <div style={ palNew }>
                        <ScoreViewMobile score={ score }/>
                        { leftMobile }
                        <CommentBoxViewMobile send={ sendComment }/>
                    </div>
                </MediaQuery>
            </div>
        );
    }
}