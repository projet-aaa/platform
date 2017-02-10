// represents what a teacher can show to his students

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { View as QuizView } from "../../views/quiz/quizView"
import { View as QuizStatView } from "./quizStatView"
import { QuizType, Quiz } from "../../models/class/class"

export interface StateProps {
    // a quiz
    quiz: Quiz
    // statistics
    quizStats: any
    // true => we show the right answer
    showCorrection: boolean
}
export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            quizStats,
            showCorrection
        } = this.props;

        let quizRender = (<QuizView 
            quiz={ quiz } 
            quizChoice={
                {
                    quizId: quiz.id,
                    choice: -1 
                }
            }
            showCorrection={ showCorrection } 
            forceUnfold={ true } 
            nextQuiz={ null } 
            prevQuiz={ null }
            choose={ null }
            validate={ null }
        />)

        // if there are stats we put them on the right
        let res = null
        if (!showCorrection) {
            res = (
                <div className="page-content">
                    { quizRender }
                </div>
            )
        } else {
            res = (
                <div className="page-content">
                    <div className="row">
                        <div className="col-lg-5">
                            { quizRender }
                        </div>
                        <div className="col-lg-7"> 
                            <QuizStatView quizStats={ quizStats } correctChoice={ quiz.choices[quiz.answer] }/>
                        </div>
                    </div>
                </div>
            )
        }
        
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
                { res }
            </div>
        );
    }
}