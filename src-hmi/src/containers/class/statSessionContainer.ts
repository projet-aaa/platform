import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/stats/statSessionView"

import { StatState } from "../../store/stats/reducer"
import { SessionState } from "../../store/sessions/reducer"

function mapStateToProps(state, ownProps) {
    return { }
}
function mapDispatchToProps(dispatch, ownProps) {
    return { }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    null,
    View
)