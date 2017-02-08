import { connect } from "react-redux";

import { launchAction } from "../../store/dashboard/actions/actions"

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