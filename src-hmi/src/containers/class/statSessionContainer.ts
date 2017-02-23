import { connect } from "react-redux";

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statSessionView"

import { StatState } from "../../store/stats/reducer"
import { SessionState } from "../../store/sessions/reducer"

function mapStateToProps(state: any, ownProps: any): StateProps {
    let stat: StatState = state.stat,
        sessions: SessionState = state.sessions
    return { 
        sessions: stat.sessionIds.map(id => sessions.sessions[id])
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        choose: (id) => console.log("Choose : " + id)
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    View
)