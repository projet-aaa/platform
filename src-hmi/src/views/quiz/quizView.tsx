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
        return (
            <div>
                <h2>Question : { quiz.question } </h2>
                { answers }
                <button onClick={ () => validate(quiz.id) } > Valider </button>
            </div>
        );
    }
}