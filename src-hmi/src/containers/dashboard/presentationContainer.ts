import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/dashboard/presentationView"
import { DashboardState } from "../../store/dashboard/reducers/reducer"

import { Quiz, QuizInstanceState, QuizLauncher, AttentionEventType } from "../../models/class/class"

function mapStateToProps(state: any, prop): StateProps {
    let dash: DashboardState = state.dashboard
    return { 
        quiz: dash.quiz[dash.currQuizId],
        stats: dash.currQuizStat,
        showCorrection: dash.currQuizState == QuizInstanceState.FEEDBACK
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return { }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)