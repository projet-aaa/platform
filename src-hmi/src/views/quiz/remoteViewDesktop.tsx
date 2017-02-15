// represents what sees a student during a live session (his remote) on a computer

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as QuizView } from "../../views/quiz/quizView"
import { View as ScoreView } from "../../views/quiz/scoreView"
import { View as FeedbackView } from "../../views/quiz/feedbackView"
import { View as CommentBoxView } from "./commentBoxView"
import { QuizType, Quiz, QuizLocalChoice } from "../../models/class/class"
import { getText } from '../../utils'

export interface StateProps {
    // a quiz
    quiz: Quiz
    // the current choice
    quizChoice: QuizLocalChoice

    // true => show the correction
    showCorrection: boolean
    // true => answer explanations whill be shown automatically, else we have to click on the answers
    forceUnfold: boolean
    // true if there is a question now, false else (in that case we show the feedback buttons)
    question: boolean
    //the user score
    score: number
    // the user rank
    rank: number
    // the number of people who answered the quiz
    population: number
    // the high score
    highscore: number
    // the average of quiz
    average: number
}
export interface ActionProps {
    // Fires an action signaling that an answer has been chosen
    choose(choice: any)
    // Fires an action signaling that an answer has been validated
    validateAnswer()
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
            quizChoice,
            showCorrection,
            forceUnfold,
            validateAnswer,
            question,
            score,
            rank,
            population,
            highscore,
            average,
            choose,
            sendComment,
            nextQuiz,
            prevQuiz,
            signalPanic,
            signalSlow,
            signalFast,
        } = this.props;
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let left = question ?
            <QuizView quiz={ quiz } quizChoice={ quizChoice } choose={ choose } validate={ validateAnswer } 
                    showCorrection={ showCorrection } forceUnfold={ forceUnfold } nextQuiz={ nextQuiz } 
                    prevQuiz={ prevQuiz }/> :
            <FeedbackView signalPanic={ signalPanic } signalSlow={ signalSlow } signalFast={ signalFast }/>
        
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div className="row">
                <div className="col-lg-8">
                    { left }
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <ScoreView score={ score } rank={ rank } population={ population } 
                            highScore={ highscore } average={ average }/>
                    </div>
                    <div className="row">
                        <CommentBoxView send={ sendComment }/>
                    </div>
                </div>
            </div>
        );
    }
}