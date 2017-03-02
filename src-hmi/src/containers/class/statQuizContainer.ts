import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statQuizView"

import { fetchSessionStats, fetchSessionByName } from "../../api/fetchs"
import { fetchStatsSuccess } from "../../store/stats/actions"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        quiz: state.stat.quiz,
        quizChoices: state.stat.quizChoices,
        currentQuizId: state.stat.currentQuizId
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchStatsSuccess: (res) => dispatch(fetchStatsSuccess(res)),
        chooseQuiz: (quizId: string) => console.log("Choose : " + quizId),
        gotoFeedback: () => console.log("go to feedback"),
        gotoSession: () => console.log("go to sessions")
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