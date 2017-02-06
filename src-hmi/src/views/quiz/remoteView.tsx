// represents what sees a student during a live session (his remote)

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import QuizContainer from "../../containers/quiz/quizContainer"
import ScoreContainer from "../../containers/quiz/scoreContainer"
import FeedbackContainer from "../../containers/quiz/feedbackContainer"
import { View as CommentBoxView} from "./commentBoxView"
import { QuizType, Quiz } from "../../models/quiz"
import { getText } from '../../utils'

export interface StateProps {
    // a quiz
    quiz: Quiz
    // true if consultation mode, false if answer mode
    consultation: boolean
}
export interface ActionProps {
        // Fires an action signaling that an answer has been validated
    validateAnswer(quizId: number)
    sendComment(comment: string)
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            consultation,
            validateAnswer,
            sendComment
        } = this.props;
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let question = true,
            left = question ?  
                    <QuizContainer quiz={ quiz } validate={ validateAnswer } consultation={ consultation }/> :
                    <FeedbackContainer/>
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <div className="page-content">
                        <div className="row">
                            <div className="col-lg-8">
                                { left }
                            </div>
                            <div className="col-lg-4">
                                <div className="row">
                                    <ScoreContainer/>
                                </div>
                                <div className="row">
                                    <CommentBoxView send={ sendComment }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                </MediaQuery>
            </div>
        );
    }
}