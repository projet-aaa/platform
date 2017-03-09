// represents what sees a student during a live session (his remote) on a computer

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as QuizView } from "../../views/quiz/quizView"
import { View as ScoreView } from "../../views/quiz/scoreView"
import { View as FeedbackView } from "../../views/quiz/feedbackView"
import { View as CommentBoxView } from "./commentBoxView"
import { QuizType, Quiz } from "../../models/class/class"
import { getText } from '../../utils'

export interface StateProps {
    // has joined
    isConnected: boolean
    isTeacher: boolean
    
    // a quiz
    quiz: Quiz
    // the current choice
    quizChoice: any

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

    attentionState: string
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
    // signal the student is neither in panic, too slow nor too fast
    signalOk()
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
export class View extends React.Component<any, any> {
    props: Props

    render() {
        const {
            isConnected,
            isTeacher,

            quiz,
            quizChoice,
            showCorrection,
            forceUnfold,
            question,
            score,
            rank,
            population,
            highscore,
            average,
            attentionState,

            choose,
            validateAnswer,
            sendComment,
            nextQuiz,
            prevQuiz,
            signalPanic,
            signalSlow,
            signalFast,
            signalOk,
        } = this.props
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let left = question && quiz ?
            <QuizView quiz={ quiz } quizChoice={ quizChoice } choose={ choose } validate={ validateAnswer } 
                    showCorrection={ showCorrection } forceUnfold={ forceUnfold } nextQuiz={ nextQuiz } 
                    prevQuiz={ prevQuiz } back={ null }/> :
            <FeedbackView state={ attentionState } signalPanic={ signalPanic } signalSlow={ signalSlow } signalFast={ signalFast } signalOk={ signalOk }/>
        
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
            { !isTeacher ?
                (isConnected ?
                <div className="row">
                    <div className="col-lg-8">
                        { left }
                    </div>
                    <div className="col-lg-4">
                        
                        <div className="row">
                            <CommentBoxView send={ sendComment }/>
                        </div>
                    </div>
                </div>
                :
                <div className="row">
                    <h1>Connection au server...</h1>
                </div>)
                :
                <div className="row">
                    <h1>Vous ne pouvez pas accéder à la télécommande en tant que professeur</h1>
                </div>
            }
            </div>
        )
    }
}

// <div className="row">
//                             <ScoreView score={ score } rank={ rank } population={ population } 
//                                 highScore={ highscore } average={ average }/>
//                         </div>