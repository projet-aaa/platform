import { connect } from "react-redux";

import { launchAction } from "../../store/dashboard/actions/actions"

//import {  } from "../../models/dashboard"

import { StateProps, ActionProps, View } from "../../views/dashboard/dashboardView"

function mapStateToProps(state: any): any {
    return { 
        studentFeedback: state.studentFeedback,
        quizStatsArray: state.quizStatsArray
    }
}
function mapDispatchToProps(dispatch): any {
    return {
        launchQuiz: (id) => dispatch(launchAction(id))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)