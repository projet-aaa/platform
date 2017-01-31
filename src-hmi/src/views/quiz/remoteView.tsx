import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import QuizContainer from "../../containers/quiz/quizContainer"
import ScoreContainer from "../../containers/quiz/scoreContainer"
import FeedbackContainer from "../../containers/quiz/feedbackContainer"

import { QuizType, Quiz } from "../../models/quiz"

export interface StateProps {
    quiz: Quiz
}
export interface ActionProps {
    validateAnswer(quizId: number)
}

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
        
        let question = true,
            left = question ?  
                    <QuizContainer quiz={ quiz } validate={ validateAnswer }/> :
                    <FeedbackContainer/>
        return (
            <div>
                <div className="page-content">
                    <div className="row">
                        <div className="col-lg-8">
                            { left }
                        </div>
                        <div className="col-lg-4">
                            <ScoreContainer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}