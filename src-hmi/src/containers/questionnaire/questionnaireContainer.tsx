//EXTERNAL IMPORTS
import { connect } from "react-redux";

// INTERNAL IMPORTS
import { chooseAction, validateAction, 
        nextQuizAction, prevQuizAction,
        seeCorrectionAction, chooseQuizAction,
        chooseComboQuizAction } from "../../store/questionnaire/actions/actions"
import { Quiz } from "../../models/class/class"
import { StateProps, ActionProps, View } from "../../views/questionnaire/questionnaireTabView"
import { QuestionnaireState } from "../../store/questionnaire/reducers/reducer"

function mapStateToProps(state: any): StateProps {
    let questionnaire: QuestionnaireState = state.questionnaire
    return {
        // all the quiz available for this session
        quizs: questionnaire.quizs,
        // the collection of quiz launched
        actualQuizs: questionnaire.actualQuizs,
        // the index of the current quiz in the quiz collection "actualQuizs"
        quizId: questionnaire.quizId,
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

function mapDispatchToProps(dispatch, state): ActionProps {
    return {
        // Fires an action signaling that a quiz has been chosen
        // id is the id of the quiz chosen and mode is answer or correction
        chooseQuiz: (id, mode) => dispatch(chooseQuizAction(id, mode)),
        // Fires an action signaling that the combo of quiz has been chosen
        chooseComboQuiz: () => dispatch(chooseComboQuizAction()),
        // Fires an action signaling that an answer has been chosen
        choose: (id, choice) => dispatch(chooseAction(choice)),
        // Fires an action signaling that an answer has been validated
        validateAnswer: (quizId) => dispatch(validateAction()),
        // go to the next question
        nextQuiz: () => dispatch(nextQuizAction()),
        // go to the previous question
        prevQuiz: () => dispatch(prevQuizAction()),
        // at the end of a quiz, launch the correction
        seeCorrection: () => dispatch(seeCorrectionAction())
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)