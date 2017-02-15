import { connect } from "react-redux";

let validateAction = (id) => console.log("[remoteContainer] validateAction not implemented: " + id)
let chooseAction = (id, choice) => console.log("[remoteContainer] chooseAction not implemented")
let signalAction = (signal) => console.log("[remoteContainer] chooseAction not implemented")

import { StateProps, ActionProps, View } from "../../views/quiz/remoteViewMobile"

import { Quiz, AttentionStateType } from "../../models/class/class"

function mapStateToProps(state: any): StateProps {
    return {
        // update the quiz prop with the current quiz
        quiz: state.remote.quiz[state.remote.currentQuiz],
        quizChoice: state.remote.choice,
        score: state.remote.score,
        question: state.remote.question,
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        // signals the store that an answer has been validated
        validateAnswer: () => dispatch(validateAction("bullshit")),
        // signals the store that a comment has been sent
        sendComment: (comment) => console.log(comment),
        // signals the store that an answer has been chosen
        choose: (choice) => dispatch(chooseAction("lksdjfk", choice)),
        signalPanic: () => dispatch(signalAction(AttentionStateType.PANIC)),
        signalSlow: () => dispatch(signalAction(AttentionStateType.TOO_SLOW)),
        signalFast: () => dispatch(signalAction(AttentionStateType.TOO_FAST))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)