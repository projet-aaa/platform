// REMOTE VIEW
// Renders the student remote during a live lesson

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import QuizContainer from "../../containers/quiz/quizContainer"
import ScoreContainer from "../../containers/quiz/scoreContainer"
import FeedbackContainer from "../../containers/quiz/feedbackContainer"
import { QuizType, Quiz } from "../../models/quiz"

export interface StateProps {
    // a quiz
    quiz: Quiz
}

export interface ActionProps {
    // Fires an action signaling that an answer has been validated
    validateAnswer(quizId: number)
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
        let question = false,
            left = question ?  
                    <QuizContainer quiz={ quiz } validate={ validateAnswer }/> :
                    <FeedbackContainer/>
        // the quiz or the buttons are on the left and the scores are on the right
        return (
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
        );
    }
}