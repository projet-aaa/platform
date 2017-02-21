import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/dashboard/dashboardView"
import { DashboardState } from "../../store/dashboard/reducers/reducer"

import { Quiz } from "../../models/class/class"

import { startQuiz, showFeedback, stopQuiz } from "../../store/dashboard/actions/actions"

function mapStateToProps(state: any): StateProps {
    let dash: DashboardState = state.dashboard

    let stats = {},
        quiz = dash.currQuizId && dash.quiz ? dash.quiz[dash.currQuizId] : null

    if(quiz) {
        Object.keys(dash.currQuizStat).forEach(function (key) {
            var count = dash.currQuizStat [key]
            stats[(quiz as Quiz).choices[key]] = count
        })
    }

    return { 
        tooFast: dash.studentPop ? (dash.tooFast / dash.studentPop) * 100 : 0,
        tooSlow: dash.studentPop ? (dash.tooSlow / dash.studentPop) * 100 : 0,
        panic: dash.studentPop ? (dash.panic / dash.studentPop) * 100 : 0,
        currentQuiz: quiz,
        quizStats: stats, // choice for the current quiz => count who chose
        quizLaunchers: dash.quizLauncher ? dash.quizLauncher : []
    }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        launchQuiz: (quizId) => dispatch(startQuiz(quizId)),
        correction: () => dispatch(showFeedback()),
        finish: () => dispatch(stopQuiz())
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)