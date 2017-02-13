import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/class/statView"

function mapStateToProps(state: any, ownProps: any): StateProps {
    return { 
        
    }
}
function mapDispatchToProps(dispatch, ownProps): ActionProps {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)