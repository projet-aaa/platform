import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/dashboard/dashboardView"
import { DashboardState } from "../../store/dashboard/reducers/reducer"
import { WSRoomState } from "../../store/wsrooms/reducer"

import { Quiz, QuizType } from "../../models/class/class"

import { startQuiz, showFeedback, stopQuiz } from "../../store/dashboard/actions/actions"
import { closeRoom } from "../../store/wsrooms/actions"

function mapStateToProps(state: any) {
    let dash: DashboardState = state.dashboard,
        ws: WSRoomState = state.wsserver

    let stats = {},
        quiz: Quiz = dash.currQuizId && dash.quiz ? dash.quiz[dash.currQuizId] : null

    if(quiz) {
        if(quiz.type == QuizType.MCQ || quiz.type == QuizType.MMCQ) {
            Object.keys(dash.currQuizStat).forEach(function (key) {
                var count = dash.currQuizStat [key]
                stats[(quiz as Quiz).choices[key]] = count
            })
        } else {
            stats = dash.currQuizStat
        }
    }

    return { 
        roomId: ws.currentRoom,
        studentCount: dash.studentPop,
        quizState: dash.currQuizState,
        tooFast: dash.tooFast,
        tooSlow: dash.tooSlow,
        panic: dash.panic,
        currentQuiz: quiz,
        quizStats: stats, // choice for the current quiz => count who chose
        quizLaunchers: dash.quizLauncher ? dash.quizLauncher : []
    }
}
function mapDispatchToProps(dispatch) {
    return {
        launchQuiz: (quizId) => dispatch(startQuiz(quizId)),
        correction: () => dispatch(showFeedback()),
        finish: () => dispatch(stopQuiz()),
        closeRoom: (roomId) => dispatch(closeRoom(roomId))
    }
}

function mergeProps(sp, dp, op) {
    return Object.assign(sp, dp, op, {
        closeRoom: () => dp.closeRoom(sp.roomId)
    })
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)