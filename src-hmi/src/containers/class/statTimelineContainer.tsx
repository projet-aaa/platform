import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statFeedbackView"

import { fetchSessionByName, fetchTimeline } from "../../api/fetchs"
import { fetchTimelineSuccess } from "../../store/stats/actions"

function mapStateToProps(state, ownProps) {
    return { 
        timeline: state.stats.timeline
    }
}
function mapDispatchToProps(dispatch, ownProps) {
    return { 
        fetchTimelineSuccess: timeline => dispatch(fetchTimelineSuccess(timeline))
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    (props, done) => {
        fetchSessionByName(props.params.course, session => {
            fetchTimeline(session.id, timeline => {
                props.fetchTimelineSuccess(timeline)
                done()
            })
        })
    },
    null,
    View
)