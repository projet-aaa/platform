// Represents the view of the questionnaire tab for a student

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { QuizType, Quiz, QuizLocalChoice, QuizGroup } from "../../models/class/class"
import { View as QuizView } from "../../views/quiz/quizView"
import { getCbValue } from '../../utils'

export interface StateProps {
    // all the quiz available for this session
    quizGroups: QuizGroup[]
    // the collection of quiz launched
    actualQuizs: QuizGroup
    // the index of the current quiz in the quiz collection "actualQuizs"
    quizIndex: number
    // actual quiz
    currentQuiz: Quiz
    // the list of choices for each quiz
    quizChoices: QuizLocalChoice[]
    // the mode of quiz consultation (answer or correction)
    quizMode: string
    // the user score
    score: number
}
export interface ActionProps {
    // Fires an action signaling that a quiz has been chosen
    // id is the id of the quiz chosen and mode is answer or correction
    chooseQuiz(id: string, mode: string)
    // // Fires an action signaling that the combo of quiz has been chosen
    // chooseComboQuiz()
    // Fires an action signaling that an answer has been chosen
    choose(id: string, choice: any)
    // Fires an action signaling that an answer has been validated
    validateAnswer(quizId: string)
    // go to the next question
    nextQuiz()
    // go to the previous question
    prevQuiz()
    // at the end of a quiz, launch the correction
    seeCorrection()
    // to return to the list of quiz
    returnToChoices()
}

// style for the text
var mediumSizeText = {
    fontSize: 30
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            quizGroups,
            actualQuizs,
            quizIndex,
            currentQuiz,
            quizChoices,
            quizMode,
            score,
            chooseQuiz,
            // chooseComboQuiz,
            choose,
            validateAnswer,
            nextQuiz,
            prevQuiz,
            seeCorrection,
            returnToChoices
        } = this.props;
        

        var quizItems = []
        for (var i=0 ; i<quizGroups.length ; i++) {
            var aux = quizGroups[i]
            quizItems.push(
                <a key={ aux.id } href="#" className="list-group-item" onClick={ (function(id){ return () => chooseQuiz(id, "answer")})(aux.id) }>
                    { aux.title }
                </a>
            )
        }
        // quizItems.push(
        //     <a href="#" className="list-group-item" onClick={ chooseComboQuiz }>
        //         Combo quiz
        //     </a>
        // )

        // // the items for the combobox of quiz
        // var quizItems = []
        // for (var i=0 ; i<quizs.length ; i++) {
        //     quizItems.push(
        //         <option value={ quizs[i].id }>{ quizs[i].title }</option>
        //     )
        // }
        // // the quiz combobox
        // var quizComboBox = (
        //     <select id="quizComboBox">
        //         { quizItems }
        //     </select>
        // )
        // // the mode combobox
        // var modeComboBox = (
        //     <select id="modeComboBox">
        //         <option value="answer" selected>Répondre</option>
        //         <option value="correction">Correction</option>
        //     </select>
        // )

        // // the render of the selection of a quiz
        // var quizChooseRender = (
        //     <div className="row">
        //         <div className="col-lg-2">
        //             { quizComboBox }
        //         </div>
        //         <div className="col-lg-2">
        //             { modeComboBox }
        //         </div>
        //         <div className="col-lg-2">
        //             <button className="btn btn-primary" onClick={ () => chooseQuiz(getCbValue("quizComboBox"), getCbValue("modeComboBox")) }>Choisir</button>
        //         </div>
        //         <div className="col-lg-offset-4 col-lg-2">
        //             <button className="btn btn-primary" onClick={ () => chooseComboQuiz() }>Combo Quiz</button>
        //         </div>
        //     </div>
        // )

        var quizRender = null
        if (currentQuiz != null) {
            // we add the the question its index into the actual quiz collection
            let realIndex = quizIndex+1
            let newQuestion = "Question " + realIndex + "/" + actualQuizs.quizs.length + " : " + currentQuiz.question
            let aux = Object.assign({}, currentQuiz, {
                question: newQuestion
            })
            quizRender = (
                <QuizView
                    quiz={ aux }
                    quizChoice={ quizChoices[currentQuiz.id] }
                    showCorrection={ (quizMode=="correction") }
                    forceUnfold={ true }
                    choose={ (quizMode=="answer") ? (choice) => choose(currentQuiz.id, choice) : null }
                    validate={ () => validateAnswer(currentQuiz.id) }
                    nextQuiz={ (quizMode=="correction" && quizIndex==actualQuizs.quizs.length-1) ? null : nextQuiz }
                    prevQuiz={ (quizIndex==0) ? null : prevQuiz }
                />
            )
        }

        // the render of the button to return to the quiz list and the title of the quiz group
        var topRender = null
        if (currentQuiz!= null) {
            topRender = (
                <div className="row">
                    <div className="col-lg-2">
                        <button className="btn btn-primary" onClick={ returnToChoices }>Retour</button>
                    </div>
                    <div className="col-lg-10">
                        {actualQuizs.title }
                    </div>
                </div>
            )
        }

        // if there isn't an actual quiz, we display the quiz list
        // else we display a quiz, when the end of a quiz is reach, we display the score of the user
        var mainRender = null
        if (currentQuiz == null) {
            mainRender = (
                <div>
                    { quizItems }
                </div>
            )
        } else {
            if (quizIndex==actualQuizs.quizs.length) {
                mainRender = (
                    <div>
                        { topRender }
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Score final : { score }/{ quizIndex }</h2>
                                <button onClick={ seeCorrection }>Voir correction</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                mainRender = (
                    <div>
                        { topRender }
                        <div className="row">
                            <div className="col-lg-12">
                                { quizRender }
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div>
                { mainRender }
            </div>
        );
    }
}