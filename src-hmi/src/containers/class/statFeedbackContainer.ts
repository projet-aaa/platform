import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statFeedbackView"

import { fetchSessionStats, fetchSessionByName } from "../../api/fetchs"
import { fetchStatsSuccess } from "../../store/stats/actions"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        panic: state.stat.panic,
        tooSlow: state.stat.tooSlow,
        tooFast: state.stat.tooFast,
        date: state.stat.date,
        comments: state.stat.comments
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        fetchStatsSuccess: (res) => dispatch(fetchStatsSuccess(res)),
        goToQuiz: () => console.log("go to quiz"),
        goToSessions: () => console.log("go to sessions")
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