import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { View as AnswerView} from "./answerView"
import { QuizType, Quiz } from "../../models/quiz"
import { getText } from "../../utils/index"

export interface StateProps {
    // the quiz 
    quiz: Quiz
    // true => show the correction
    showCorrection: boolean
    // true => answer explanations will be shown automatically, else we have to click on the answers
    forceUnfold: boolean
}
export interface ActionProps {
    // select an answer (if null, there will be no validate button and no answer will be able to be selected)
    choose(quizId: number, choice: any)
    // validate the answer
    validate(quizId: number)
    // go to the next question
    nextQuiz()
    // go to the previous question
    prevQuiz()
}

// style for the text
var bigSizeText = {
    fontSize: 50
}
var mediumSizeText = {
    fontSize: 30
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quiz,
            showCorrection,
            forceUnfold,

            choose, 
            validate,
            nextQuiz,
            prevQuiz
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
                    return (choose==null) ? () => {  }: () => { choose(quiz.id, i) }
                } 
                var answerItems = quiz.choices.map((item, i) => {
                    return <AnswerView key={item} ind={i} text={item} choose={ createChooseAction(i) } chosen={ quiz.choice == i } rightAnswer={i==quiz.answer} explanation={ quiz.explanations[i] } showCorrection={ showCorrection } forceUnfold={ forceUnfold }/>;
                });
                answers = 
                (
                    <ul>
                        {answerItems}
                    </ul>
                )
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

        // a question with its answers
        let questionRender = (
            <div>
                <h3 style={bigSizeText}>Enoncé : { quiz.question }</h3>
                <br/>
                { answers }
            </div>
        )
        // if we are in answer mode, we have to display a vilidate button
        let validateButton = null;
        if (!(choose==null)) {
            validateButton = (
                <div className="row">
                    <div className="col-lg-offset-8 col-lg-4">
                        <div className="btn btn-lg btn-success" onClick={ () => validate(quiz.id) }>
                            Valider réponse
                        </div>
                    </div>
                </div>
            )
        }
        // if they are associated to an action, we have to display previous and next button
        let quizRender = null;
        if (nextQuiz == null && prevQuiz == null) {
            quizRender = (
                <div className="row">
                    <div className="col-lg-12">
                        { questionRender }
                    </div>
                </div>
            )
        } else if (nextQuiz == null) {
            quizRender = (
                <div className="row">
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size">Précédent</button>
                    </div>
                    <div className="col-lg-8">
                        { questionRender }
                    </div>
                </div>
            )
        } else if (prevQuiz == null) {
            quizRender = (
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2">
                        { questionRender }
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size">Suivant</button>
                    </div>
                </div>
            )
        } else {
            quizRender = (
                <div className="row">
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size">Précédent</button>
                    </div>
                    <div className="col-lg-8">
                        { questionRender }
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size">Suivant</button>
                    </div>
                </div>
            )
        }
        // returns a panel containing the question and the answers defined above
        return (
            <div>
                <div className="panel">
                    <div className="pal">
                        { quizRender }
                        { validateButton }
                    </div>
                </div>
            </div>
        );
    }
}