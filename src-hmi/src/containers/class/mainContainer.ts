import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/class/mainView"

function mapStateToProps(state, ownProps) {
    return { 
        isTeacher: state.auth.isTeacher
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        
    }
}

export default rootWrapper(
    mapStateToProps, 
    mapDispatchToProps,
    null,
    null,
    null,
    View
)