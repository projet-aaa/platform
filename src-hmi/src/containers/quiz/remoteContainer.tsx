// REMOTE CONTAINER
// A remote view where we provide the chosen action and the new quiz

// EXTERNAL IMPORTS
import { connect } from "react-redux";

// INTERNAL IMPORTS
import { validateAction } from "../../store/quiz/actions/actions"
import { Quiz } from "../../models/quiz"
import { StateProps, ActionProps, View } from "../../views/quiz/remoteView"

function mapStateToProps(state: any): StateProps {
    return {
        // update the quiz prop with the current quiz
        quiz: state.quiz.quiz[state.remote.currentQuiz]
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        // signals the store that an answer has been validated
        validateAnswer: (quizId) => dispatch(validateAction(quizId))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)