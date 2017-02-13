import { connect } from "react-redux";

import { StateProps, ActionProps, View } from "../../views/discipline/disciplineView"

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