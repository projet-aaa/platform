// Represents the view of the questionnaire tab for a student

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import { QuizType, Quiz, QuizLocalChoice } from "../../models/class/class"
import { View as QuizView } from "../../views/quiz/quizView"
import { getCbValue } from '../../utils'

export interface StateProps {
    // all the quiz available for this session
    quizs: Quiz[]
    // the collection of quiz launched
    actualQuizs: Quiz[]
    // the index of the current quiz in the quiz collection "actualQuizs"
    quizId: string
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
    // Fires an action signaling that the combo of quiz has been chosen
    chooseComboQuiz()
    // Fires an action signaling that an answer has been chosen
    choose(id: string, choice: any)
    // Fires an action signaling that an answer has been validated
    validateAnswer(quizId: number)
    // go to the next question
    nextQuiz()
    // go to the previous question
    prevQuiz()
    // at the end of a quiz, launch the correction
    seeCorrection()
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
            quizs,
            actualQuizs,
            quizId,
            currentQuiz,
            quizChoices,
            quizMode,
            score,
            chooseQuiz,
            chooseComboQuiz,
            choose,
            validateAnswer,
            nextQuiz,
            prevQuiz,
            seeCorrection
        } = this.props;
        
        // the items for the combobox of quiz
        var quizItems = []
        for (var i=0 ; i<quizs.length ; i++) {
            quizItems.push(
                <option value={ quizs[i].id }>{ quizs[i].title }</option>
            )
        }
        // the quiz combobox
        var quizComboBox = (
            <select id="quizComboBox">
                { quizItems }
            </select>
        )
        // the mode combobox
        var modeComboBox = (
            <select id="modeComboBox">
                <option value="answer" selected>Répondre</option>
                <option value="correction">Correction</option>
            </select>
        )

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
        //             <button className="btn btn-primary" onClick={ () => chooseQuiz(parseInt(getCbValue("quizComboBox")), getCbValue("modeComboBox")) }>Choisir</button>
        //         </div>
        //         <div className="col-lg-offset-4 col-lg-2">
        //             <button className="btn btn-primary" onClick={ () => chooseComboQuiz() }>Combo Quiz</button>
        //         </div>
        //     </div>
        // )

        // var quizRender = null
        // if (currentQuiz != null) {
        //     quizRender = (
        //         <QuizView
        //             quiz={ currentQuiz }
        //             quizChoice={ quizChoices[currentQuiz.id] }
        //             showCorrection={ (quizMode=="correction") }
        //             forceUnfold={ true }
        //             choose={ (quizMode=="answer") ? (choice) => choose(currentQuiz.id, choice) : null }
        //             validate={ validateAnswer }
        //             nextQuiz={ (actualQuizs.length==quizId+1) ? null : nextQuiz }
        //             prevQuiz={ (quizId==0) ? null : prevQuiz }
        //         />
        //     )
        // }

        // // the quiz and the score if it's a combo quiz
        // var mainRender = null
        // if (quizId==actualQuizs.length) {
        //     mainRender = (
        //         <div className="row">
        //             <div className="col-lg-12 text-center">
        //                 <h2>Score final : { score }/{ quizId }</h2>
        //                 <button onClick={ seeCorrection }>Voir correction</button>
        //             </div>
        //         </div>
        //     )
        // } else {
        //     mainRender = (
        //         <div className="row">
        //             <div className="col-lg-12">
        //                 { quizRender }
        //             </div>
        //         </div>
        //     )
        // }

        // the quiz selection on the top and then the quiz
        return (
            <div>
            </div>
        );

                // <div className="row">
                //     { quizChooseRender }
                // </div>
                // { mainRender }
    }
}