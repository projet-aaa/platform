import { connect } from "react-redux";

let validateAction = (id) => console.log("[remoteContainer] validateAction not implemented: " + id)
let chooseAction = (id, choice) => console.log("[remoteContainer] chooseAction not implemented")
let signalAction = (signal) => console.log("[remoteContainer] chooseAction not implemented")

import { Quiz } from "../../models/quiz"

import { StateProps, ActionProps, View } from "../../views/quiz/remoteViewMobile"

function mapStateToProps(state: any): StateProps {
    return {
        // update the quiz prop with the current quiz
        quiz: state.quiz.quiz[state.remote.currentQuiz],
        score: state.remote.score,
        question: state.remote.question,
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        // signals the store that an answer has been validated
        validateAnswer: (quizId) => dispatch(validateAction(quizId)),
        // signals the store that a comment has been sent
        sendComment: (comment) => console.log(comment),
        // signals the store that an answer has been chosen
        choose: (id, choice) => dispatch(chooseAction(id, choice)),
        signalPanic: () => dispatch(signalAction(0)),
        signalSlow: () => dispatch(signalAction(1)),
        signalFast: () => dispatch(signalAction(2))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)