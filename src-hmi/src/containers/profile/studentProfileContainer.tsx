import { connect } from "react-redux";

import { View } from "../../views/profile/studentProfileView"

function mapStateToProps(state: any): any {
    return { 
        
    }
}
function mapDispatchToProps(dispatch): any {
    return {
        
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)