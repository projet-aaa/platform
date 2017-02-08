import { connect } from "react-redux";

let launchAction = (title) => console.log('[dashboardContainer] launchAction is not implemented')

import { StateProps, ActionProps, View } from "../../views/dashboard/dashboardView"

function mapStateToProps(state: any): any {
    return { 
        studentFeedback: state.studentFeedback,
        quizStatsArray: state.quizStatsArray
    }
}
function mapDispatchToProps(dispatch): any {
    return {
        launchQuiz: (title) => dispatch(launchAction(title))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)