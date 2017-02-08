// represents what a teacher can show to his students

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as QuizView } from "../../views/quiz/quizView"
import { QuizType, Quiz } from "../../models/class/class"

export interface StateProps {
    // a quiz
    quiz: Quiz
    // statistics
    stats: any
}
export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            stats
        } = this.props;

        let quizRender = (<QuizView 
            quiz={ quiz } 
            quizChoice={ null }
            showCorrection={ true } 
            forceUnfold={ true } 
            nextQuiz={ null } 
            prevQuiz={ null }
            choose={ null }
            validate={ null }
        />)

        // if there are stats we put them on the right
        let res = null
        if (stats == null) {
            res = (
                <div className="page-content">
                    { quizRender }
                </div>
            )
        } else {
            res = (
                <div className="page-content">
                    <div className="row">
                        <div className="col-lg-7">
                            { quizRender }
                        </div>
                        <div className="col-lg-5">
                            
                        </div>
                    </div>
                </div>
            )
        }
        
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    { res }
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                </MediaQuery>
            </div>
        );
    }
}