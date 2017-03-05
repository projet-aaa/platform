import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statTimelineView"

import { fetchSessionByName, fetchTimeline } from "../../api/fetchs"
import { fetchTimelineSuccess } from "../../store/stats/actions"

function mapStateToProps(state, ownProps) {
    return { 
        timeline: state.stat.timeline
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
            fetchTimeline(session['hydra:member'][0].id, timeline => {
                props.fetchTimelineSuccess(timeline)
                done()
            })
        })
    },
    null,
    View
)