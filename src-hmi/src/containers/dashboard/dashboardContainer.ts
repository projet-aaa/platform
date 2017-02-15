import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/dashboard/dashboardView"
import { DashboardState } from "../../store/dashboard/reducers/reducer"

import { Quiz } from "../../models/class/class"

import { launchQuiz } from "../../store/dashboard/actions/actions"

function mapStateToProps(state: any): StateProps {
    let dash: DashboardState = state.dashboard
    return { 
        tooFast: dash.tooFast,
        tooSlow: dash.tooSlow,
        panic: dash.panic,
        currentQuiz: dash.currQuizId && dash.quiz ? dash.quiz[dash.currQuizId] : null,
        quizStats: dash.currQuizStat, // choice for the current quiz => percentage who chose
        quizLaunchers: dash.quizLauncher ? dash.quizLauncher : []
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        launchQuiz: (quizId) => dispatch(launchQuiz(quizId))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)