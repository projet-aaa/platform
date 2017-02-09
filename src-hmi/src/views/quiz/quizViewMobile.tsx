import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as AnswerViewMobile} from "./answerViewMobile"
import { QuizType, Quiz, QuizLocalChoice } from "../../models/class/class"
import { getText } from "../../utils/index"

export interface StateProps {
    // the quiz 
    quiz: Quiz
    // the choice the player has done
    quizChoice: QuizLocalChoice
}
export interface ActionProps {
    choose(quizId: number, choice: any) // select an answer
    validate(quizId: number) // validate the answer
}

// style for the text
var sizeText = {
    fontSize: 15
}
var palNew = {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0
}
var paddingUl = {
    padding: 0
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            quizChoice,
            choose, 
            validate
        } = this.props;

        let inputFieldStyle = {
            height:"25px",
            fontSize:"15pt"
        }

        // answers can have different type according to the type of quiz (MCQ, open question)
        let answers = null
        switch(quiz.type) {
            case QuizType.MCQ: 
                var answerItems = quiz.choices.map((item, i) => {
                    return <AnswerViewMobile key={item} ind={i} text={item} choose={ choose(quiz.id, i) } chosen={ quizChoice.choice == i }/>;
                });
                answers = 
                (
                    <ul style={ paddingUl }>
                        {answerItems}
                    </ul>
                )
            break
            case QuizType.TEXT:
                answers =
                (<input id="quiz-text" 
                        type="text" 
                        value={ quizChoice.choice }
                        style={ inputFieldStyle }
                        onChange={ () => choose(quiz.id, getText("quiz-text")) }> 
                </input>)
            break
        }

        // a question with its answers
        let questionRender = (
            <div>
                <h3 style={sizeText}>Enoncé : { quiz.question }</h3>
                { answers }
            </div>
        )
        let quizRender = (
                <div className="row">
                    <div className="col-lg-12">
                        { questionRender }
                    </div>
                </div>
            )

        // validate button
        let validateButton = (
                <div className="row">
                    <div className="pull-right">
                        <div className="btn btn-success" onClick={ () => validate(quiz.id) }>
                            Valider réponse
                        </div>
                    </div>
                </div>
            )
        
        // returns a panel containing the question and the answers defined above
        return (
            <div>
                <div className="panel">
                    <div style={ palNew }>
                        { quizRender }
                        { validateButton }
                    </div>
                </div>
            </div>
        );
    }
}