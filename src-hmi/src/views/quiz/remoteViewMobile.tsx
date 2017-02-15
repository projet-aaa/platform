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
    // a quiz
    quiz: Quiz
    // the current choice
    quizChoice: QuizLocalChoice

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
            validateAnswer,
            score,
            question,
            choose,
            sendComment,
            signalPanic,
            signalSlow,
            signalFast
        } = this.props;
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let mainComponent = question ?
                    <QuizViewMobile quiz={ quiz } quizChoice={ quizChoice } choose={ choose } validate={ validateAnswer }/> :
                    <FeedbackViewMobile signalPanic={ signalPanic } signalSlow={ signalSlow } signalFast={ signalFast }/>
        // the score is on the top, next there is the quiz or feddback and last the comment box
        return (
            <div style={ palNew }>
                <ScoreViewMobile score={ score }/>
                { mainComponent }
                <CommentBoxViewMobile send={ sendComment }/>
            </div>
        );
    }
}