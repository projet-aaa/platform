//EXTERNAL IMPORTS
import { connect } from "react-redux";

// INTERNAL IMPORTS
import rootWrapper from "../../wrappers/rootWrapper"

import { chooseAction, validateAction, 
        nextQuizAction, prevQuizAction,
        seeCorrectionAction, chooseQuizAction,
        returnAction, fetchTests } from "../../store/questionnaire/actions/actions"
import { fetchSessionByName } from "../../api/fetchs"
import { Quiz } from "../../models/class/class"
import { StateProps, ActionProps, View } from "../../views/questionnaire/questionnaireTabView"
import { QuestionnaireState } from "../../store/questionnaire/reducers/reducer"

function mapStateToProps(state: any): StateProps {
    let questionnaire: QuestionnaireState = state.questionnaire
    return {
        // all the quiz available for this session
        quizGroups: questionnaire.quizGroups,
        // the collection of quiz launched
        actualQuizs: questionnaire.actualQuizs,
        // the index of the current quiz in the quiz collection "actualQuizs"
        quizIndex: questionnaire.quizIndex,
        // actual quiz
        currentQuiz: questionnaire.currentQuiz,
        // the list of choices for each quiz
        quizChoices: questionnaire.quizChoices,
        // the mode of quiz consultation (answer or correction)
        quizMode: questionnaire.quizMode,
        // the user score
        score: questionnaire.score
    }
}

function mapDispatchToProps(dispatch, state) {
    return {
        // Fires an action signaling that a quiz has been chosen
        // id is the id of the quiz chosen and mode is answer or correction
        chooseQuiz: (id, mode) => dispatch(chooseQuizAction(id, mode)),
        // // Fires an action signaling that the combo of quiz has been chosen
        // chooseComboQuiz: () => dispatch(chooseComboQuizAction()),
        // Fires an action signaling that an answer has been chosen
        choose: (id, choice) => dispatch(chooseAction(choice)),
        // Fires an action signaling that an answer has been validated
        validateAnswer: (quizId) => dispatch(validateAction()),
        // go to the next question
        nextQuiz: () => dispatch(nextQuizAction()),
        // go to the previous question
        prevQuiz: () => dispatch(prevQuizAction()),
        // at the end of a quiz, launch the correction
        seeCorrection: () => dispatch(seeCorrectionAction()),
        // to return to the list of quiz
        returnToChoices: () => dispatch(returnAction()),

        fetchTests: (sessionId, success) => dispatch(fetchTests(sessionId, success))
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    (props, done) => {
        fetchSessionByName(props.params.course, res => {
            props.fetchTests(res["hydra:member"][0].id, done)
        })
    },
    View
)