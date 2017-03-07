import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statQuizView"

import { fetchSessionStats, fetchSessionByName } from "../../api/fetchs"
import { fetchStatsSuccess, chooseQuiz } from "../../store/stats/actions"

function mapStateToProps(state, ownProps) {
    return { 
        quiz: state.stat.quiz,
        quizChoices: state.stat.quizChoices,
        currentQuizId: state.stat.currentQuizId
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchStatsSuccess: (res) => dispatch(fetchStatsSuccess(res)),
        chooseQuiz: (quizId: string) => dispatch(chooseQuiz(quizId))
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    (props, done) => {
        fetchSessionByName(props.params.course, session => {
            fetchSessionStats(session['hydra:member'][0].id, res => {
                props.fetchStatsSuccess(res)
                done()
            })
        })
    },
    null,
    View
)