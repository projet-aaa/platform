import { connect } from "react-redux";

let launchAction = (title) => console.log('[dashboardContainer] launchAction is not implemented')

import { StateProps, ActionProps, View } from "../../views/dashboard/dashboardView"
import { DashboardState } from "../../store/dashboard/reducers/reducer"

import { Quiz } from "../../models/class/class"

function mapStateToProps(state: any): StateProps {
    let dash: DashboardState = state.dashboard
    return { 
        tooFast: dash.tooFast,
        tooSlow: dash.tooSlow,
        panic: dash.panic,
        currentQuiz: dash.quiz[dash.currQuizId],
        quizStats: dash.currQuizStat, // choice for the current quiz => percentage who chose
        quizLaunchers: dash.quizLauncher
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        launchQuiz: (title) => dispatch(launchAction(title))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)