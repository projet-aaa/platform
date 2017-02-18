// QUIZ VIEW
// Renders a question and his potential answers

// EXTERAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { View as AnswerView} from "./answerView"
import { QuizType, Quiz, QuizLocalChoice } from "../../models/class/class"
import { getText } from "../../utils/index"

export interface StateProps {
    // the quiz 
    quiz: Quiz
    // the quiz choice
    quizChoice: QuizLocalChoice
    // true => show the correction
    showCorrection: boolean
    // true => answer explanations will be shown automatically, else we have to click on the answers
    forceUnfold: boolean
}
export interface ActionProps {
    // select an answer (if null, there will be no validate button and no answer will be able to be selected)
    choose(choice: any)
    // validate the answer
    validate()
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
            quizChoice,
            showCorrection,
            forceUnfold,

            choose, 
            validate,
            nextQuiz,
            prevQuiz
        } = this.props

        // the render of the answers can be different according to the type of quiz (MCQ, open question)
        let answers = null
        switch(quiz.type) {
            // the render is a list of AnswerView (radio button and answer text)
            case QuizType.MCQ: 
                let createChooseAction = (i) => {
                    return choose == null ? () => {  }: () => { choose(i) }
                } 
                var answerItems = quiz.choices.map((item, i) => {
                    return <AnswerView
                        key={ i }
                        ind={ i } 
                        text={ item } 
                        chosen={ quizChoice == i } 
                        rightAnswer={ i == quiz.answer }
                        explanation={ quiz.explanations[i] } 
                        showCorrection={ showCorrection }
                        forceUnfold={ forceUnfold }

                        choose={ createChooseAction(i) } 
                    />;
                });
                answers = 
                (
                    <ul>
                        {answerItems}
                    </ul>
                )
            break
            // the render is a text field
            case QuizType.TEXT:
                answers =
                (<input id="quiz-text" 
                        type="text" 
                        value={ quizChoice.choice }
                        style={ inputFieldStyle }
                        onChange={ () => choose(getText("quiz-text")) }> 
                </input>)
            break
        }

        // a question with its answers
        let questionRender = (
            <div>
                <h3 style={bigSizeText}>Enoncé : { quiz.question }</h3>
                <br/>
                { answers }
                { showCorrection ? <h3> { quiz.justification } </h3> : ""}
            </div>
        )
        // if we are in answer mode, we have to display a vilidate button
        let validateButton = null;
        if (choose) {
            validateButton = (
                <div className="row">
                    <div className="col-lg-offset-8 col-lg-4">
                        <div className="btn btn-lg btn-success" onClick={ () => validate() }>
                            Valider réponse
                        </div>
                    </div>
                </div>
            )
        }
        // if they are associated to an action, we have to display previous and next button
        let quizRender = null;
        if (!nextQuiz && !prevQuiz) {
            quizRender = (
                <div className="row">
                    <div className="col-lg-12">
                        { questionRender }
                    </div>
                </div>
            )
        } else if (!nextQuiz) {
            quizRender = (
                <div className="row">
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size" onClick={ prevQuiz }>Précédent</button>
                    </div>
                    <div className="col-lg-8">
                        { questionRender }
                    </div>
                </div>
            )
        } else if (!prevQuiz) {
            quizRender = (
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2">
                        { questionRender }
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size" onClick={ nextQuiz }>Suivant</button>
                    </div>
                </div>
            )
        } else {
            quizRender = (
                <div className="row">
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size" onClick={ prevQuiz }>Précédent</button>
                    </div>
                    <div className="col-lg-8">
                        { questionRender }
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-primary covering-size" onClick={ nextQuiz }>Suivant</button>
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