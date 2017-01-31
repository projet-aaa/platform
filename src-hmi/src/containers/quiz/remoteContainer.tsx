import { connect } from "react-redux";

import { validateAction } from "../../store/quiz/actions/actions"

import { Quiz } from "../../models/quiz"

import { StateProps, ActionProps, View } from "../../views/quiz/remoteView"

function mapStateToProps(state: any): StateProps {
    return { 
        quiz: state.quiz.quiz[state.remote.currentQuiz]
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        validateAnswer: (quizId) => dispatch(validateAction(quizId))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)