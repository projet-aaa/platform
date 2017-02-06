// QUIZ VIEW
// Renders a question and his potential answers

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { View as AnswerView} from "./answerView"
import { QuizType, Quiz } from "../../models/quiz"

export interface StateProps {
    // the quiz 
    quiz: Quiz
}
export interface ActionProps {
    // Fires an action signaling that an answer has been chosen
    choose(quizId: number, choice: any)
    // Fires an action signaling that an answer has been validated
    validate(quizId: number)
}

// get the text of an element of the page with the id "id"
function getText(id: string): string {
    return (document.getElementById(id) as any).value
}

// Style for the text field
var inputFieldStyle = {
    height:"50px",
    fontSize:"30pt"
}
// Style for the text
var bigSizeText = {
    fontSize: 50
}
// Style for the text
var mediumSizeText = {
    fontSize: 30
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            choose, validate
        } = this.props;

        // the render of the answers can be different according to the type of quiz (MCQ, open question)
        let answers = null
        switch(quiz.type) {
            // the render is a list of AnswerView (radio button and answer text)
            case QuizType.MCQ: 
                var answerItems = quiz.choices.map((item, i) => {
                    return <AnswerView key={item} text={item} choose={ () => { choose(quiz.id, i) } } chosen={ quiz.choice == i }></AnswerView>;
                });
                answers = 
                (<ul>
                    {answerItems}
                </ul>)
            break
            // the render is a text field
            case QuizType.TEXT:
                answers =
                (<input id="quiz-text" 
                        type="text" 
                        value={ quiz.choice }
                        style={ inputFieldStyle }
                        onChange={ () => choose(quiz.id, getText("quiz-text")) }> 
                </input>)
            break
        }
        // returns a panel containing the question and the answers defined above
        return (
            <div>
                <div className="panel">
                    <div className="panel-heading" style={mediumSizeText}>
                        Quiz
                    </div>
                    <div className="panel-body pan white-background">
                        <div className="pal">
                            <h3 style={bigSizeText}>Enoncé : { quiz.question }</h3>
                            <br/><br/>
                            <ul>
                                { answers }
                            </ul>
                            <div className="row">
                                <div className="col-md-offset-8 col-md-4 col-xs-12">
                                    <div className="btn btn-lg btn-success" onClick={ () => validate(quiz.id) }>
                                        Valider réponse
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}