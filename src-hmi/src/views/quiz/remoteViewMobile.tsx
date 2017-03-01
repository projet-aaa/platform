// represents what sees a student during a live session (his remote) on a mobile phone

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as QuizViewMobile } from "../../views/quiz/quizViewMobile"
import { View as ScoreViewMobile } from "../../views/quiz/scoreViewMobile"
import { View as FeedbackViewMobile } from "../../views/quiz/feedbackViewMobile"
import { View as CommentBoxViewMobile } from "./commentBoxViewMobile"
import { QuizType, Quiz, QuizLocalChoice } from "../../models/class/class"
import { getText } from '../../utils'

export interface StateProps {
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
            validateAnswer,
            score,
            
            question,
            choose,
            sendComment,
            nextQuiz,
            prevQuiz,
            signalPanic,
            signalSlow,
            signalFast,
            signalOk
        } = this.props
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let mainComponent = question ?
                    <QuizViewMobile quiz={ quiz } quizChoice={ quizChoice } showCorrection={ showCorrection } forceUnfold={ forceUnfold } choose={ choose } validate={ validateAnswer } nextQuiz={ nextQuiz } prevQuiz={ prevQuiz } back={ null }/> :
                    <FeedbackViewMobile signalPanic={ signalPanic } signalSlow={ signalSlow } signalFast={ signalFast } signalOk={ signalOk }/>
        // the score is on the top, next there is the quiz or feddback and last the comment box
        return (
            <div style={ palNew }>
            { !isTeacher ?
                (isConnected ?
                    <div>
                        { mainComponent }
                        <CommentBoxViewMobile send={ sendComment }/>
                    </div>
                :
                    <h1>Connection au server...</h1>
                )
                :
                <div className="row">
                    <h1>Vous ne pouvez pas accéder à la télécommande en tant que professeur</h1>
                </div>
            }
            </div>
        )
    }
}

                // <ScoreViewMobile score={ score }/>