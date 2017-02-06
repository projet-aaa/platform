// FEEDBACK CONTAINER
// A feedback view where we provide the chosen action

// EXTERNAL IMPORTS
import { connect } from "react-redux";

// INTERNAL IMPORTS
import { StateProps, ActionProps, View } from "../../views/quiz/feedbackView"
import { signalAction } from "../../store/quiz/actions/actions"

function mapStateToProps(state: any): StateProps {
    return {}
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        // signals the store panic button has been clicked
        signalPanic: () => dispatch(signalAction(0)),
        // signals the store slow button has been clicked
        signalSlow: () => dispatch(signalAction(1)),
        // signals the store fast button has been clicked
        signalFast: () => dispatch(signalAction(2))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)