import { connect } from "react-redux";

import { validateAction } from "../../store/quiz/actions/actions"

import { Quiz } from "../../models/quiz"

import { StateProps, ActionProps, View } from "../../views/quiz/remoteView"

function mapStateToProps(state: any): StateProps {
    return {
        // update the quiz prop with the current quiz
        quiz: state.quiz.quiz[state.remote.currentQuiz],
        consultation: state.remote.consultation
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        // signals the store that an answer has been validated
        validateAnswer: (quizId) => dispatch(validateAction(quizId)),
        sendComment: (comment) => dispatch((comment) => console.log(comment))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)