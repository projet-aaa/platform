import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/quiz/feedbackView"

import { signalAction } from "../../store/quiz/actions/actions"

function mapStateToProps(state: any): StateProps {
    return {}
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        signalPanic: () => dispatch(signalAction(0)),
        signalSlow: () => dispatch(signalAction(1)),
        signalFast: () => dispatch(signalAction(2))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)