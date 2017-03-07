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
    quizChoice: any
    // true => show the correction
    showCorrection: boolean
    // true => answer explanations will be shown automatically, else we have to click on the answers
    forceUnfold: boolean
}
export interface ActionProps {
    choose(choice: any) // select an answer
    validate() // validate the answer
    // go to the next question
    nextQuiz()
    // go to the previous question
    prevQuiz()
    // go back
    back()
}

// styles
var palNew = {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0
}
var paddingUl = {
    padding: 0
}
var paddingButton = {
    paddingBottom: 2
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
            prevQuiz,
            back
        } = this.props

        let inputFieldStyle = {
            height: "25px",
            fontSize: "15pt"
        }

        // answers can have different type according to the type of quiz (MCQ, open question)
        let answers
        switch(quiz.type) {
            case QuizType.MMCQ:
            case QuizType.MCQ: 
                var answerItems = quiz.choices.map((item, i) => {
                    return <AnswerViewMobile 
                        key={ i } 
                        ind={ i } 
                        text={ item } 
                        choose={ choose == null ? () => { } : () => choose(i) } 
                        chosen={ quiz.type == QuizType.MMCQ ? quizChoice.indexOf(i) >= 0 : quizChoice == i }
                        rightAnswer={ quiz.type == QuizType.MMCQ ? quiz.answer.indexOf(i) >= 0 : quiz.answer == i }
                        showCorrection={ showCorrection }
                        forceUnfold={ forceUnfold }
                        explanation={ quiz.explanations[i] }
                    />
                })
                answers = (<ul style={ paddingUl }>{ answerItems }</ul>)
            break
            case QuizType.TEXT:
                answers =
                (<input id="quiz-text" 
                        type="text" 
                        value={ quizChoice }
                        style={ { height: "30px", fontSize: "15pt", width: "100%", marginBottom: "10px"} }
                        onChange={ () => choose(getText("quiz-text")) }> 
                </input>)
            break
        }

        // a question with its answers
        let questionRender = (
            <div>
                <h3 style={ {fontSize: 15, marginTop: 0} }>{ quiz.question }</h3>
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

        // // validate button
        // let validateButton = (
        //     <div className="row">
        //         <div className="pull-right">
        //             <div className="btn btn-success" onClick={ () => validate() }>
        //                 Valider réponse
        //             </div>
        //         </div>
        //     </div>
        // )
        
        // buttons
        var buttonsRender = []
        if (choose) {
            buttonsRender.push(
                <div className="row" style={ paddingButton }>
                    <div className="col-lg-12">
                        <button className="btn btn-success covering-size" onClick={ validate }>
                            Valider réponse
                        </button>
                    </div>
                </div>
            )
        }
        if (prevQuiz) {
            buttonsRender.push(
                <div className="row" style={ paddingButton }>
                    <div className="col-lg-12">
                        <button className="btn btn-primary covering-size" onClick={ prevQuiz }>
                            Précédent
                        </button>
                    </div>
                </div>
            )
        }
        if (nextQuiz) {
            // if we are in answer mode (showcorrection is false) we display skip question
            // else we display next
            buttonsRender.push(
                <div className="row" style={ paddingButton }>
                    <div className="col-lg-12">
                        <button className="btn btn-primary covering-size" onClick={ nextQuiz }>
                            { showCorrection ? "Suivant" : "Passer la question" }
                        </button>
                    </div>
                </div>
            )
        }
        if (back) {
            buttonsRender.push(
                <div className="row" style={ {paddingTop: 8, paddingBottom: 2} }>
                    <div className="col-lg-12">
                        <button className="btn btn-primary covering-size" onClick={ back }>
                            Retour
                        </button>
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
                        { buttonsRender }
                    </div>
                </div>
            </div>
        )
    }
}