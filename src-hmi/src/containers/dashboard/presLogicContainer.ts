import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/dashboard/presentationView"
import { DashboardState } from "../../store/dashboard/reducers/reducer"

import { Quiz, QuizInstanceState, QuizLauncher, AttentionEventType } from "../../models/class/class"

import { joinRoom, subscribe } from "../../store/wsrooms/actions"

import { CONNECTION_STATE } from "../../models/wsServer/server"

function mapStateToProps(state: any, prop) {
    let dash: DashboardState = state.dashboard

    let stats = {},
        quiz = dash.currQuizId && dash.quiz ? dash.quiz[dash.currQuizId] : null

    if(quiz) {
        Object.keys(dash.currQuizStat).forEach(function (key) {
            stats[(quiz as Quiz).choices[key]] = dash.currQuizStat [key]
        })
    }

    return { 
        quiz: quiz,
        stats: stats,
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