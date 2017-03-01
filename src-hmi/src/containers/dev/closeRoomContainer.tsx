import * as React from "react"
import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { closeRoom } from "../../store/wsrooms/actions"

function mapStateToProps(state, ownProps) {
    return { }
}
function mapDispatchToProps(dispatch, ownProps) {
    return { 
        closeRoom: () => dispatch(closeRoom(ownProps.params.prof))
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    p => {
        p.closeRoom()
    },
    (p, c) => <div> { p.params.prof }'s room is now closed</div>
)