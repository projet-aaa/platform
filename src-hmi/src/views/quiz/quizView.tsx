import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as AnswerView} from "./answerView"

import { QuizType, Quiz } from "../../models/quiz"

export interface StateProps {
    quiz: Quiz
}
export interface ActionProps {
    choose(quizId: number, choice: any)
    validate(quizId: number)
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
            choose, validate
        } = this.props;

        let answers = null
        switch(quiz.type) {
            case QuizType.MCQ: 
                var answerItems = quiz.choices.map((item, i) => {
                    return <AnswerView key={item} text={item} choose={ () => { choose(quiz.id, i) } } chosen={ quiz.choice == i }></AnswerView>;
                });
                answers = 
                (<ul>
                    {answerItems}
                </ul>)
            break
            case QuizType.TEXT:
                answers =
                (<input id="quiz-text" 
                        type="text" 
                        value={ quiz.choice }
                        onChange={ () => choose(quiz.id, getText("quiz-text")) }> 
                </input>)
            break
        }
        var bigSizeText = {
            fontSize: 50
        }
        var mediumSizeText = {
            fontSize: 30
        }
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