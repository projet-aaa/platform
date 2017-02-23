import { connect } from "react-redux"

import rootWrapper from "../../wrappers/rootWrapper"

import { StateProps, ActionProps, View } from "../../views/class/mainView"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        
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
    View
)