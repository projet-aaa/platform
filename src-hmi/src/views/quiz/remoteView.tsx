// represents what sees a student during a live session (his remote)

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import QuizContainer from "../../containers/quiz/quizContainer"
import ScoreContainer from "../../containers/quiz/scoreContainer"
import FeedbackContainer from "../../containers/quiz/feedbackContainer"

import { QuizType, Quiz } from "../../models/quiz"

export interface StateProps {
    quiz: Quiz // a quiz
}
export interface ActionProps {
    validateAnswer(quizId: number) // validate an answer
}

// get the text of an element of the page with the id "id"
function getText(id: string): string {
    return (document.getElementById(id) as any).value
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            validateAnswer
        } = this.props;
        
        // if there is a question we show the quiz, else we show the feedback buttons
        let question = true,
            left = question ?  
                    <QuizContainer quiz={ quiz } validate={ validateAnswer }/> :
                    <FeedbackContainer/>
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-8">
                            { left }
                        </div>
                        <div className="col-md-4">
                            <ScoreContainer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}