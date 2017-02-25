import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statFeedbackView"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        panic: state.stat.panic,
        tooSlow: state.stat.tooSlow,
        tooFast: state.stat.tooFast,
        date: state.stat.date,
        comments: state.stat.comments
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        goToQuiz: () => console.log("go to quiz"),
        goToSessions: () => console.log("go to sessions")
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    View
)