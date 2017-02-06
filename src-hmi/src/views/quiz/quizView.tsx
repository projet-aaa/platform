import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as AnswerView} from "./answerView"

import { QuizType, Quiz } from "../../models/quiz"

export interface StateProps {
    // the quiz 
    quiz: Quiz
    // true if consultation mode, false if answer mode
    consultation: boolean
}
export interface ActionProps {
    choose(quizId: number, choice: any) // select an answer
    validate(quizId: number) // validate the answer
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
            consultation,
            choose, validate
        } = this.props;

        let inputFieldStyle = {
            height:"50px",
            fontSize:"30pt"
        }

        // answers can have different type according to the type of quiz (MCQ, open question)
        let answers = null
        switch(quiz.type) {
            case QuizType.MCQ: 
                let createChooseAction = (i) => {
                    return consultation ? () => {  }: () => { choose(quiz.id, i) }
                } 
                var answerItems = quiz.choices.map((item, i) => {
                    console.log(i)
                    return <AnswerView key={item} ind={i} text={item} choose={ createChooseAction(i) } chosen={ quiz.choice == i } rightAnswer={i==quiz.answer} explanation={ quiz.explanations[i] } consultation={ consultation }></AnswerView>;
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
                        style={ inputFieldStyle }
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

        // a question with its answers
        let questionRender = (
            <div>
                <h3 style={bigSizeText}>Enoncé : { quiz.question }</h3>
                <br/><br/>
                <ul>
                    { answers }
                </ul>
            </div>
        )
        // if we are in answer mode, we have to display a vilidate button
        // if we are in consultation mode, we have to display previous and next button
        let validateButton = null;
        let quizRender = null;
        if (!consultation) {
            validateButton = (
                <div className="row">
                    <div className="col-lg-offset-8 col-lg-4">
                        <div className="btn btn-lg btn-success" onClick={ () => validate(quiz.id) }>
                            Valider réponse
                        </div>
                    </div>
                </div>
            )
            quizRender = (
                <div className="row">
                    <div className="col-lg-12">
                        { questionRender }
                    </div>
                </div>
            )
        } else {
            quizRender = (
                <div className="row">
                    <div className="col-lg-2">
                        <button>Précédent</button>
                    </div>
                    <div className="col-lg-8">
                        { questionRender }
                    </div>
                    <div className="col-lg-2">
                        <button>Suivant</button>
                    </div>
                </div>
            )
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
                            { quizRender }
                            { validateButton }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}